import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";



const createCategoryService = async (
  data: Omit<Category, "id" | "createdAt" | "updatedAt">,

) => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};
export { createCategoryService };