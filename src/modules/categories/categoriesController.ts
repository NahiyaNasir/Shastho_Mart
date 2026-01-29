import { NextFunction, Request, Response } from "express";
import { createCategoryService, deleteCategoryService, getAllCategoriesService } from "./categoriesService";


const createCategoryController= async (req:Request,res:Response,next:NextFunction)=>{
  try {

  
    const result= await createCategoryService (req.body)
     console.log(result);
     res.status(201).json(
        result
     )
  } catch (error) {
    next(error)
  }
}
 const getAllCategory=async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const result= await getAllCategoriesService() 
    res.status(200).json({
      success:true,
      data:result
    })
  } catch (error) {
    next(error)
  }
}
 const deleteCategory= async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const categoryId= req.params.categoryId;
    console.log(categoryId,"controller");
    const isAdmin= req.user?.role=== "ADMIN"
    const result= await deleteCategoryService(categoryId as string, isAdmin)      
    res.status(200).json({
      success:true,
      data:result
    })
  } catch (error) {
    next(error)
  }
}
export { createCategoryController, getAllCategory, deleteCategory };