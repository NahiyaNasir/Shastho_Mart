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
const getAllCategoriesService = async () => {
  const result = await prisma.category.findMany();
  return result;
}
 const deleteCategoryService= async(categoryId:string, isAdmin:boolean)=>{
   const categoryData= await prisma.category.findUniqueOrThrow({
    where:{id:categoryId}
   })
   if(!categoryData){
    throw new Error("Category not found")
   }
   if(!isAdmin){ 
    throw new Error("Unauthorized to delete category")
    }

    const result = await prisma.category.delete({
      where: { id: categoryId },
    });
  return result;
  }    
export { createCategoryService, getAllCategoriesService, deleteCategoryService };