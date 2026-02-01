import { OrderStatus } from "../../../generated/prisma/client";
declare const CreateOrderService: (data: any, userId: string) => Promise<{
    items: {
        id: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        medicineId: string;
        quantity: number;
        orderId: string;
    }[];
} & {
    id: string;
    createdAt: Date;
    userId: string;
    status: OrderStatus;
    totalPrice: import("@prisma/client-runtime-utils").Decimal;
    address: string;
}>;
declare const getAllOrderService: (status: OrderStatus) => Promise<({
    user: {
        name: string;
        email: string;
    };
    items: {
        medicine: {
            name: string;
            price: number;
            category: {
                name: string;
            };
        };
        quantity: number;
    }[];
} & {
    id: string;
    createdAt: Date;
    userId: string;
    status: OrderStatus;
    totalPrice: import("@prisma/client-runtime-utils").Decimal;
    address: string;
})[]>;
declare const getAllUserOrderService: (userId: string) => Promise<void>;
declare const getOrderByIdService: (orderId: string, userId: string) => Promise<{
    items: {
        id: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        medicineId: string;
        quantity: number;
        orderId: string;
    }[];
} & {
    id: string;
    createdAt: Date;
    userId: string;
    status: OrderStatus;
    totalPrice: import("@prisma/client-runtime-utils").Decimal;
    address: string;
}>;
declare const updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<{
    id: string;
    createdAt: Date;
    userId: string;
    status: OrderStatus;
    totalPrice: import("@prisma/client-runtime-utils").Decimal;
    address: string;
}>;
export { CreateOrderService, getAllOrderService, getAllUserOrderService, getOrderByIdService, updateOrderStatus };
//# sourceMappingURL=ordersService.d.ts.map