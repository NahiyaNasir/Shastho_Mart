import { Request, Response } from "express";
import {
  createMedicineService,
  deleteMedicineService,
  getMedicineByIdService,
  getMedicineService,
  updateMedicineService,
} from "./medicineService";
import { UserRole } from "../../middleware/middleware";
import paginationSortingHelper from "../../helper/paginationHelper";
import { sendResponse } from "../../shared/SendResponse";
import { catchAsync } from "../../shared/catchAsync";

const createMedicineController = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new Error("Unauthorized");
  }

  const result = await createMedicineService(req.body, user.id as string, req.body.categoryId);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Medicine created successfully",
    data: result,
  });
});

const getMedicine = catchAsync(async (req: Request, res: Response) => {
  const queryParams = {
    ...(req.query as Record<string, string | undefined>),
  };

  if (req.query.search && typeof req.query.search === "string") {
    queryParams.searchTerm = req.query.search;
    delete queryParams.search;
  }

  const result = await getMedicineService(queryParams);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Medicines fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getMedicineById = catchAsync(async (req: Request, res: Response) => {
  const medicineId = req.params.medicineId;
  const result = await getMedicineByIdService(medicineId as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Medicine fetched successfully",
    data: result,
  });
});

const updateMedicine = catchAsync(async (req: Request, res: Response) => {
  const medicineId = req.params.medicineId;
  const result = await updateMedicineService(medicineId as string, req.body, req.user?.id as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Medicine updated successfully",
    data: result,
  });
});

const deleteMedicine = catchAsync(async (req: Request, res: Response) => {
  const medicineId = req.params.medicineId;
  const user = req.user;
  if (!user) {
    throw new Error("Unauthorized");
  }

  const isAdmin = user.role === UserRole.ADMIN;
  const result = await deleteMedicineService(medicineId as string, isAdmin, user.id);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Medicine deleted successfully",
    data: result,
  });
});

export { createMedicineController, getMedicine, getMedicineById, updateMedicine, deleteMedicine };