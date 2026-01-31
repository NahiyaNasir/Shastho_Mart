import { NextFunction, Request, Response } from "express";
import { createMedicineService, deleteMedicineService, getMedicineByIdService, getMedicineService, updateMedicineService } from "./medicineService";

import { UserRole } from "../../middleware/middleware";
import paginationSortingHelper from "../../helper/paginationHelper";

const createMedicineController= async (req:Request,res:Response,next:NextFunction)=>{
  try {

     const user = req.user ;
        if (!user) {
            return res.status(400).json({
                error: "Unauthorized!",
            })
        }
    const result= await createMedicineService (req.body,user.id as string, req.body.categoryId)
     console.log(result);
     res.status(201).json({
      success:true,
      data:result
     }
   
     )
  } catch (error) {
    next(error)
  }
}

 const getMedicine=async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const {search} = req.query
 
    const searchType=   typeof search === 'string' ?search :undefined
     const category=   (req.query.category) as string 
      const manufacturer= (req.query.manufacturer) as string 
     console.log(manufacturer,"controller");
       const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(req.query)
    const result=await getMedicineService({search:searchType,category,manufacturer,page,limit,skip,sortBy,sortOrder});
    res.status(200).json({
      success:true,
      data:result
    });
  } catch (error) {
    next(error);
  }
}
 const getMedicineById=async(req:Request,res:Response,next:NextFunction)=>{ 
  try {
    const medicineId=req.params.id
    const result=await getMedicineByIdService(medicineId as string);
    res.status(200).json({
      success:true,
      data:result
    });
  } catch (error) {
    next(error);
  }
 }
  const updateMedicine=async(req:Request,res:Response,next:NextFunction)=>{ 
  try {
     const medicineId=req.params.medicineId;
     console.log(medicineId);
    
    const result=await updateMedicineService(medicineId as string,req.body, req.user?.id as string);
    res.status(200).json({
      success:true,
      data:result
    });
  } catch (error) {
    next(error);
  }}
  const deleteMedicine=async(req:Request,res:Response,next:NextFunction)=>{ 
  try {
     const medicineId=req.params.medicineId;  
     const user=req.user
      if (!user) {
            throw new Error("You are unauthorized!")
        }
          const isAdmin = user.role === UserRole.ADMIN
    const result=await deleteMedicineService(medicineId as string, isAdmin,user.id);
    res.status(200).json({
      success:true,
      data:result
    });
  } catch (error) {
    next(error);
  }}
export { createMedicineController , getMedicine, getMedicineById, updateMedicine, deleteMedicine};