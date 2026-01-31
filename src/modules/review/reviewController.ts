import { NextFunction, Request, Response } from "express";
import {
  createReviewService,
  deleteReviewByAdmin,
  getReviewsService,
  updateReviewByUser,
} from "./reviewService";

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    console.log(user);
    if (!user) {
      return res.status(401).json({
        error: "Unauthorized!",
      });
    }
    const result = await createReviewService(req.body, user.id);
    console.log(result);
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getReviewsService();
    res.status(200).json({
      success: true,

      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    // console.log(user);
    if (!user) {
      return res.status(401).json({
        error: "Unauthorized!",
      });
    }
    const { reviewId } = req.params;
    // console.log(reviewId);
    const result = await updateReviewByUser(
      user.id,
      req.body,
      reviewId as string,
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
 const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        error: "Unauthorized!",
      });
    }
    const { reviewId } = req.params;
    const deletedReview = await deleteReviewByAdmin(reviewId as string);
    res.status(200).json({ success: true, data: deletedReview });
  } catch (error) {
    next(error);
  }
};
export { createReview, getReviews,  updateReviewByUser,deleteReview };