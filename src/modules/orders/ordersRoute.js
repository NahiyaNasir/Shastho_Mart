import { Router } from "express";
import { CreateOrders, getAllOrder, getOrderById, updateOrder } from "./ordersController";
import auth, { UserRole } from "../../middleware/middleware";
const router = Router();
router.post('/', auth(UserRole.CUSTOMER), CreateOrders);
router.get('/', auth(UserRole.ADMIN), getAllOrder);
router.get("/seller/orders", auth(UserRole.SELLER), getAllOrder);
router.get("/:orderId", auth(UserRole.CUSTOMER), getOrderById);
router.patch("/:orderId/seller", auth(UserRole.SELLER), updateOrder);
export { router as ordersRouter };
//# sourceMappingURL=ordersRoute.js.map