import { OrderStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { QueryBuilder } from "../../utils/QueryBuilder";
import AppError from "../../errorHelpers/AppError";

const CreateOrderService = async (
  data:any,
  userId: string,
) => {
  return await prisma.$transaction(async (tx) => {
    let totalAmount = 0;
      const orderItemsForPrisma = [];

      for (let item of data.items) {
        const medicine = await tx.medicine.findUnique({
          where: { id: item.medicineId },
        });

        if (!medicine || medicine.stock < item.quantity) {
          throw new Error(
            `Medicine ${medicine?.name || "Unknown"} is out of stock`,
          );
        }

        const calculatePrice = Number(medicine.price) * item.quantity;
        totalAmount += calculatePrice;
        orderItemsForPrisma.push({
          medicineId: item.medicineId,
          quantity: item.quantity,
          price: medicine.price,
        });

        await tx.medicine.update({
          where: { id: item.medicineId },
          data: {
            stock: { decrement: item.quantity },
          },
        });
      }

   return await prisma.order.create({
      data:{
        ...data,
        userId: userId,
        totalPrice: totalAmount,
        items: { create: orderItemsForPrisma }
      },
      include: { items: true}
    })
  });
};

// Every order in the system, for admins.
const getAllOrderService = async (
  queryParams: Record<string, string | undefined>,
) => {
  const builder = new QueryBuilder(
    prisma.order,
    queryParams,
    {
      searchableFields: ["user.name", "user.email", "address"],
      filterableFields: ["status", "userId"],
    },
  );

  return builder
    .search()
    .filter()
    .paginate()
    .sort()
    .include({
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      items: {
        select: {
          quantity: true,
          price: true,
          medicine: {
            select: {
              name: true,
              price: true,
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    })
    .execute();
};

// Only orders that contain at least one of this seller's own medicines —
// a seller must never see orders belonging entirely to other sellers.
const getSellerOrderService = async (
  sellerId: string,
  queryParams: Record<string, string | undefined>,
) => {
  const builder = new QueryBuilder(
    prisma.order,
    queryParams,
    {
      searchableFields: ["user.name", "user.email", "address"],
      filterableFields: ["status"],
    },
  );

  return builder
    .search()
    .filter()
    .where({ items: { some: { medicine: { sellerId } } } })
    .paginate()
    .sort()
    .include({
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      // Only this seller's own line items within the order — a shared
      // order with another seller's medicines shouldn't leak those rows.
      items: {
        where: { medicine: { sellerId } },
        select: {
          quantity: true,
          price: true,
          medicine: {
            select: {
              name: true,
              price: true,
              sellerId: true,
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    })
    .execute();
};

const getAllUserOrderService = async (
  userId: string,
  queryParams: Record<string, string | undefined>,
) => {
  const builder = new QueryBuilder(
    prisma.order,
    queryParams,
    {
      searchableFields: ["address"],
      filterableFields: ["status"],
    },
  );

  return builder
    .search()
    .filter()
    .where({ userId })
    .paginate()
    .sort()
    .include({
      items: {
        select: {
          quantity: true,
          price: true,
          medicine: {
            select: {
              name: true,
              price: true,
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    })
    .execute();
};

const getOrderByIdService=async(orderId:string,userId:string)=>{  
      const order= await prisma.order.findFirstOrThrow({
        where:{ id:orderId,
         userId:userId
         },  
         include:{
          items:true,
         }
      });
      return order;
        }

// A seller may only change the status of an order that actually contains
// one of their own medicines.
const updateOrderStatusBySeller = async (
  orderId: string,
  sellerId: string,
  status: OrderStatus,
) => {
  const owns = await prisma.order.findFirst({
    where: { id: orderId, items: { some: { medicine: { sellerId } } } },
    select: { id: true },
  });

  if (!owns) {
    throw new AppError(
      403,
      "You can only update orders that contain your own medicines",
    );
  }

  return await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

const updateOrderStatus=async(orderId:string,status:OrderStatus)=>{
     const isExist = await prisma.order.findUniqueOrThrow({
    where: {
      id: orderId,
    },
    select: { id: true },
  });

  return await prisma.order.update({
    where: {
      id: isExist.id,
    },
    data: { status: status },
  });
};

export { CreateOrderService, getAllOrderService, getSellerOrderService, getAllUserOrderService, getOrderByIdService, updateOrderStatus, updateOrderStatusBySeller };