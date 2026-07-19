
import { OrderStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { QueryBuilder } from "../../utils/QueryBuilder";

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
console.log(totalAmount);
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
const getAllOrderService=async(userId:string)=>{  
    

 
  
    }
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
 const  updateOrderStatus=async(orderId:string,status:OrderStatus)=>{
     const isExist = await prisma.order.findUniqueOrThrow({
    where: {
      id: orderId,
    },
    select: { id: true },
  });

  console.log(isExist);

  return await prisma.order.update({
    where: {
      id: isExist.id,
      
    },
    data: { status: status },
  });
};

 

export { CreateOrderService, getAllOrderService, getAllUserOrderService, getOrderByIdService, updateOrderStatus };