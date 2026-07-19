import { Request, Response } from "express";
import {
  createReviewService,
  deleteReviewByAdmin,
  getReviewsService,
  updateReviewByUser,
} from "./reviewService";
import { sendResponse } from "../../shared/SendResponse";
import { catchAsync } from "../../shared/catchAsync";
import AppError from "../../errorHelpers/AppError";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new AppError(401, "Unauthorized");
  }

  const result = await createReviewService(req.body, user.id);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

const getReviews = catchAsync(async (req: Request, res: Response) => {
  const queryParams = {
    ...(req.query as Record<string, string | undefined>),
  };

  if (req.query.search && typeof req.query.search === "string") {
    queryParams.searchTerm = req.query.search;
    delete queryParams.search;
  }

  const result = await getReviewsService(queryParams);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Reviews fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new AppError(401, "Unauthorized");
  }

  const { reviewId } = req.params;
  const result = await updateReviewByUser(user.id, req.body, reviewId as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Review updated successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new AppError(401, "Unauthorized");
  }

  const { reviewId } = req.params;
  const deletedReview = await deleteReviewByAdmin(reviewId as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Review deleted successfully",
    data: deletedReview,
  });
});

export { createReview, getReviews, updateReview, deleteReview };