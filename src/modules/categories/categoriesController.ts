import { NextFunction, Request, Response } from "express";
import { createCategoryService } from "./categoriesService";


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
export { createCategoryController };
