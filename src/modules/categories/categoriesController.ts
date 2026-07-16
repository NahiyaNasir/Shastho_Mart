import { Request, Response } from "express";
import { createCategoryService, deleteCategoryService, getAllCategoriesService } from "./categoriesService";
import { sendResponse } from "../../shared/SendResponse";
import { catchAsync } from "../../shared/catchAsync";

const createCategoryController = catchAsync(async (req: Request, res: Response) => {
  const result = await createCategoryService(req.body);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const queryParams = {
    ...(req.query as Record<string, string | undefined>),
  };

  if (req.query.search && typeof req.query.search === "string") {
    queryParams.searchTerm = req.query.search;
    delete queryParams.search;
  }

  const result = await getAllCategoriesService(queryParams);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Categories fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  const isAdmin = req.user?.role === "ADMIN";

  const result = await deleteCategoryService(categoryId as string, isAdmin);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Category deleted successfully",
    data: result,
  });
});

export { createCategoryController, getAllCategory, deleteCategory };