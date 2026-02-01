import { createCategoryService, deleteCategoryService, getAllCategoriesService } from "./categoriesService";
const createCategoryController = async (req, res, next) => {
    try {
        const result = await createCategoryService(req.body);
        console.log(result);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
const getAllCategory = async (req, res, next) => {
    try {
        const result = await getAllCategoriesService();
        res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};
const deleteCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;
        console.log(categoryId, "controller");
        const isAdmin = req.user?.role === "ADMIN";
        const result = await deleteCategoryService(categoryId, isAdmin);
        res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};
export { createCategoryController, getAllCategory, deleteCategory };
//# sourceMappingURL=categoriesController.js.map