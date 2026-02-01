import { NextFunction, Request, Response } from "express";
declare const createCategoryController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getAllCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const deleteCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { createCategoryController, getAllCategory, deleteCategory };
//# sourceMappingURL=categoriesController.d.ts.map