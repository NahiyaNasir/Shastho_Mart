import { Router } from "express";

import auth, { UserRole } from "../../middleware/middleware";
import { UserController } from "./user.controller";

const router = Router();

// Admin-only: list all users, ban/unban a user.
router.get("/", auth(UserRole.ADMIN),UserController.getAllUsers) ;
router.patch("/:userId/status", auth(UserRole.ADMIN), UserController.updateUserStatus);
router.get("/profile/me", auth(), UserController.getUser);
router.patch("/profile/me", auth(), UserController.updateUser);

export const userRouter = router;