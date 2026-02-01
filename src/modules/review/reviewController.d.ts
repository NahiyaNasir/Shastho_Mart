import { NextFunction, Request, Response } from "express";
import { updateReviewByUser } from "./reviewService";
declare const createReview: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getReviews: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateReview: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
declare const deleteReview: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export { createReview, getReviews, updateReviewByUser, deleteReview };
//# sourceMappingURL=reviewController.d.ts.map