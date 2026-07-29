import { Request, Response } from "express";
import { sendResponse } from "../../shared/SendResponse";
import {
  CreateOrderService,
  getAllOrderService,
  getSellerOrderService,
  getAllUserOrderService,
  getOrderByIdService,
  updateOrderStatus,
  updateOrderStatusBySeller,
} from "./ordersService";
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

// All orders in the system (admin only).
const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const queryParams = {
    ...(req.query as Record<string, string | undefined>),
  };

  if (req.query.search && typeof req.query.search === "string") {
    queryParams.searchTerm = req.query.search;
    delete queryParams.search;
  }

  const result = await getAllOrderService(queryParams);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Orders fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

// Only orders containing this seller's own medicines.
const getSellerOrders = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new AppError(401, "Unauthorized");
  }

  const queryParams = {
    ...(req.query as Record<string, string | undefined>),
  };

  if (req.query.search && typeof req.query.search === "string") {
    queryParams.searchTerm = req.query.search;
    delete queryParams.search;
  }

  const result = await getSellerOrderService(user.id, queryParams);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Orders fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

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

// Admin: update any order's status, no ownership restriction.
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

// Seller: update status only on orders that contain their own medicines.
const updateOrderBySeller = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new AppError(401, "Unauthorized");
  }

  const orderId = req.params.orderId;
  const status = req.body.status;
  const result = await updateOrderStatusBySeller(orderId as string, user.id, status);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Order updated successfully",
    data: result,
  });
});

export {
  CreateOrders,
  getAllOrder,
  getSellerOrders,
  getMyOrders,
  getOrderById,
  updateOrder,
  updateOrderBySeller,
};