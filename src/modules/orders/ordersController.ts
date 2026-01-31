import { NextFunction, Request, Response } from "express";
import { CreateOrderService, getAllOrderService, getOrderByIdService, updateOrderStatus } from "./ordersService";
import { UserRole } from "../../middleware/middleware";

 const CreateOrders=async(req:Request,res:Response,next:NextFunction)=>{
    try {
         const user= req.user
         const data= req.body
         console.log(data);

       const result = await CreateOrderService(data,user?.id as string);
       console.log(result);
         res.status(201).json({ 
            success:true,
           data:result})
    } catch (error) {
        next(error);
    }
 }
  const getAllOrder=async(req:Request,res:Response,next:NextFunction)=>{
    try {
       
       const result= await getAllOrderService(req.query.status as any);
       res.status(200).json({
        success:true,
        data:result
       })
    } catch (error) {
        next(error);
    } }

      const getOrderById=async(req:Request,res:Response,next:NextFunction)=>{
    try {
       const orderId= req.params.id;
       const user= req.user;
       console.log(orderId);
       if (!user) {
           res.status(401).json({ success: false, message: "User not authenticated" });
           return;
       }
       const result= await getOrderByIdService(orderId as string,user.id );
       res.status(200).json({
        success:true,
        data:result
       })
    } catch (error) {
        next(error);
    } }
     const  updateOrder=async(req:Request,res:Response,next:NextFunction)=>{
      try {
        const orderId = req.params.orderId;
        console.log(orderId);
        const status = req.body.status;
        console.log(status);
        const result = await updateOrderStatus(orderId as string, status);
        res.status(200).json({
          success: true,
          data: result
        });
      } catch (error) {
         next(error);
      }
     }

  export {CreateOrders, getAllOrder, getOrderById, updateOrder};