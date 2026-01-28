import { NextFunction, Request, Response } from "express";
import { createMedicineService } from "./medicineService";

const createMedicineController= async (req:Request,res:Response,next:NextFunction)=>{
  try {

    //  const user = req.user;
    //     if (!user) {
    //         return res.status(400).json({
    //             error: "Unauthorized!",
    //         })
    //     }
    const result= await createMedicineService (req.body, req.body.categoryId)
     console.log(result);
     res.status(201).json(
        result
     )
  } catch (error) {
    next(error)
  }
}
export { createMedicineController };