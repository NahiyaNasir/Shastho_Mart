import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { UserService } from "./user.service";
import { IQueryParams } from "../../interface/QueryBuilder.interface";
import { sendResponse } from "../../shared/SendResponse";


const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user;
  const result = await UserService.getUser(user);
  sendResponse(res,{
     httpStatusCode: 200,
    success: true,
    message: "Review created successfully",
    data: result,
    
  });
});
const getProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user;
  const result = await UserService.getProfile(user);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Profile fetched success.",
    data: result
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const data = req.body;
  const result = await UserService.updateUser(user, data);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,  
    message: "User updated successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
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

  const result = await UserService.getAllUsers(query, user?.id as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Users fetched successfully!",
    data: result.data,
    meta: result.meta,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const data = req.body;

  const result = await UserService.updateUserStatus(userId as string, data);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "User status updated!",
    data: result,
  });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const data = req.body;

  const result = await UserService.updateUserRole(userId as string, data);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "User Role updated!",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await UserService.deleteUser(userId as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "User delete successfully!",
    data: result,
  });
});

const adminMetaData = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.adminMetaData();
  sendResponse(res, {
    httpStatusCode: 200,
    data: result,
    success: true,
    message: "admin meta fetched success.",
  });
});

const sellerMetaData = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user;
  console.log(user);
  const result = await UserService.sellerMetaData(user?.id as string);
  sendResponse(res, {
    httpStatusCode: 200,
    data: result,
    success: true,
    message: "seller meta fetched success.",
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const data = req.body;
  const result = await UserService.updateProfile(user?.id as string, data);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,  
    message: "Profile updated successfully",
    data: result,
  });
});

export const UserController = {
  getUser,
  updateUser,
  getAllUsers,
  updateUserStatus,
  deleteUser,
  updateUserRole,
  sellerMetaData,
  adminMetaData,
  updateProfile,
  getProfile,
};