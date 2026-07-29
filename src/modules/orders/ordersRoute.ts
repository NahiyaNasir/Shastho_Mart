import { Router } from "express";
import {
  CreateOrders,
  getAllOrder,
  getSellerOrders,
  getMyOrders,
  getOrderById,
  updateOrderBySeller,
} from "./ordersController";
import auth, { UserRole } from "../../middleware/middleware";

const router = Router();

router.post('/', auth(UserRole.CUSTOMER), CreateOrders);
router.get('/', auth(UserRole.ADMIN), getAllOrder);

// Static paths before ":orderId" — otherwise Express matches "/my-orders"
// and "/seller/orders" as if "my-orders"/"seller" were an :orderId value.
router.get("/my-orders", auth(UserRole.CUSTOMER), getMyOrders);
router.get("/seller/orders", auth(UserRole.SELLER), getSellerOrders);

router.get("/:orderId", auth(UserRole.CUSTOMER), getOrderById);
router.patch("/:orderId/seller", auth(UserRole.SELLER), updateOrderBySeller);

export { router as ordersRouter };