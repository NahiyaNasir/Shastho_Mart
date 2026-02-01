import { NextFunction, Request, Response } from "express";
declare const CreateOrders: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getAllOrder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getOrderById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const updateOrder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { CreateOrders, getAllOrder, getOrderById, updateOrder };
//# sourceMappingURL=ordersController.d.ts.map