import { Category } from "../../../generated/prisma/client";
declare const createCategoryService: (data: Omit<Category, "id" | "createdAt" | "updatedAt">) => Promise<{
    name: string;
    id: string;
    createdAt: Date;
}>;
declare const getAllCategoriesService: () => Promise<{
    name: string;
    id: string;
    createdAt: Date;
}[]>;
declare const deleteCategoryService: (categoryId: string, isAdmin: boolean) => Promise<{
    name: string;
    id: string;
    createdAt: Date;
}>;
export { createCategoryService, getAllCategoriesService, deleteCategoryService };
//# sourceMappingURL=categoriesService.d.ts.map