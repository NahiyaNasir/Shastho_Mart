import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { QueryBuilder } from "../../utils/QueryBuilder";

const createCategoryService = async (
  data: Omit<Category, "id" | "createdAt" | "updatedAt">,
) => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getAllCategoriesService = async (
  queryParams: Record<string, string | undefined> = {},
) => {
  const queryBuilder = new QueryBuilder<Category, Record<string, unknown>, unknown>(
    prisma.category,
    queryParams,
    {
      searchableFields: ["name"],
      filterableFields: ["name"],
    },
  );

  return queryBuilder.search().filter().paginate().sort().execute();
};

const deleteCategoryService = async (categoryId: string, isAdmin: boolean) => {
  const categoryData = await prisma.category.findUniqueOrThrow({
    where: { id: categoryId },
  });

  if (!isAdmin) {
    throw new Error("Unauthorized to delete category");
  }

  const result = await prisma.category.delete({
    where: { id: categoryId },
  });
  return result;
};

export { createCategoryService, getAllCategoriesService, deleteCategoryService };