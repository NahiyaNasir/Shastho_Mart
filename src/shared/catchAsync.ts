import { NextFunction, Request, RequestHandler, Response } from "express";
import AppError from "../errorHelpers/AppError";

export const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error: any) {
            console.log(error);

            const statusCode = error instanceof AppError ? error.statusCode : 500;

            res.status(statusCode).json({
                success: false,
                message: error.message || 'Something went wrong',
            });
        }
    }
}