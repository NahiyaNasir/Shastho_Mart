import { CreateOrderService, getAllOrderService, getOrderByIdService, updateOrderStatus } from "./ordersService";
const CreateOrders = async (req, res, next) => {
    try {
        const user = req.user;
        const data = req.body;
        console.log(data);
        const result = await CreateOrderService(data, user?.id);
        console.log(result);
        res.status(201).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};
const getAllOrder = async (req, res, next) => {
    try {
        const result = await getAllOrderService(req.query.status);
        res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};
const getOrderById = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const user = req.user;
        console.log(orderId);
        if (!user) {
            res.status(401).json({ success: false, message: "User not authenticated" });
            return;
        }
        const result = await getOrderByIdService(orderId, user.id);
        res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};
const updateOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        console.log(orderId);
        const status = req.body.status;
        console.log(status);
        const result = await updateOrderStatus(orderId, status);
        res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};
export { CreateOrders, getAllOrder, getOrderById, updateOrder };
//# sourceMappingURL=ordersController.js.map