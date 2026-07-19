import { Request, Response } from "express";
import { sendResponse } from "../../shared/SendResponse";
import { CreateOrderService, getAllOrderService, getAllUserOrderService, getOrderByIdService, updateOrderStatus } from "./ordersService";
import { catchAsync } from "../../shared/catchAsync";
import AppError from "../../errorHelpers/AppError";
import { IQueryParams } from "../../interface/QueryBuilder.interface";

const CreateOrders = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const data = req.body;
  const result = await CreateOrderService(data, user?.id as string);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

// const getAllOrder = catchAsync(async (req: Request, res: Response) => {
//   const queryParams = {
//     ...(req.query as Record<string, string | undefined>),
//   };

//   if (req.query.search && typeof req.query.search === "string") {
//     queryParams.searchTerm = req.query.search;
//     delete queryParams.search;
//   }

//   const result = await getAllOrderService(queryParams);

//   sendResponse(res, {
//     httpStatusCode: 200,
//     success: true,
//     message: "Orders fetched successfully",
//     data: result.data,
//     meta: result.meta,
//   });
// });

// The logged-in customer's own order history (used by the "My Orders" page).
const getMyOrders = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user;
  const query: IQueryParams = {
    searchTerm: req.query.searchTerm as string,
    page: req.query.page as string,
    limit: req.query.limit as string,
    sortBy: req.query.sortBy as string,
    sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
    fields: req.query.fields as string,
    includes: req.query.includes as string,
  };

  const result = await getAllUserOrderService(user?.id as string, query);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Orders fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const user = req.user;
  if (!user) {
    throw new AppError(401, "Unauthorized");
  }

  const result = await getOrderByIdService(orderId as string, user.id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Order fetched successfully",
    data: result,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const status = req.body.status;
  const result = await updateOrderStatus(orderId as string, status);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Order updated successfully",
    data: result,
  });
});

export { CreateOrders,  getMyOrders, getOrderById, updateOrder };