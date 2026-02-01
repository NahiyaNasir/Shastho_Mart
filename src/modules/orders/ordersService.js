import { prisma } from "../../lib/prisma";
const CreateOrderService = async (data, userId) => {
    return await prisma.$transaction(async (tx) => {
        let totalAmount = 0;
        const orderItemsForPrisma = [];
        for (let item of data.items) {
            const medicine = await tx.medicine.findUnique({
                where: { id: item.medicineId },
            });
            if (!medicine || medicine.stock < item.quantity) {
                throw new Error(`Medicine ${medicine?.name || "Unknown"} is out of stock`);
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
            data: {
                ...data,
                userId: userId,
                totalPrice: totalAmount,
                items: { create: orderItemsForPrisma }
            },
            include: { items: true }
        });
    });
};
const getAllOrderService = async (status) => {
    const orders = await prisma.order.findMany({
        where: {
            status: status
        },
        include: {
            user: {
                select: {
                    name: true,
                    email: true
                }
            },
            items: {
                select: {
                    quantity: true,
                    medicine: {
                        select: {
                            name: true,
                            price: true,
                            category: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                },
            }
        },
        orderBy: {
            createdAt: "desc",
        }
    });
    return orders;
};
const getAllUserOrderService = async (userId) => {
};
const getOrderByIdService = async (orderId, userId) => {
    const order = await prisma.order.findFirstOrThrow({
        where: { id: orderId,
            userId: userId
        },
        include: {
            items: true,
        }
    });
    return order;
};
const updateOrderStatus = async (orderId, status) => {
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
//# sourceMappingURL=ordersService.js.map