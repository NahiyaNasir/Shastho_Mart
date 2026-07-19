import { Router } from "express";
import { CreateOrders,   getOrderById, updateOrder } from "./ordersController";
import auth, { UserRole } from "../../middleware/middleware";

const router = Router();

router.post('/', auth(UserRole.CUSTOMER), CreateOrders);
// router.get('/', auth(UserRole.ADMIN), getAllOrder);

// Static paths before ":orderId" — otherwise Express matches "/my-orders"
// and "/seller/orders" as if "my-orders"/"seller" were an :orderId value.
// router.get("/my-orders", auth(UserRole.CUSTOMER), getMyOrders);
// router.get("/seller/orders", auth(UserRole.SELLER), getAllOrder);

router.get("/:orderId", auth(UserRole.CUSTOMER), getOrderById);
router.patch("/:orderId/seller", auth(UserRole.SELLER), updateOrder);

export { router as ordersRouter };