import { Router } from "express";
import { createCategoryController, deleteCategory, getAllCategory } from "./categoriesController";
import auth, { UserRole } from "../../middleware/middleware";
const router = Router();
router.get("/", getAllCategory);
router.post("/", auth(UserRole.ADMIN), createCategoryController);
router.delete("/:categoryId", auth(UserRole.ADMIN), deleteCategory);
export const categoriesRouter = router;
//# sourceMappingURL=cateroriesRoute.js.map