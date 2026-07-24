import { Request, Response } from "express";
import { getPublicStats } from "./stats.service";
import { sendResponse } from "../../shared/SendResponse";
import { catchAsync } from "../../shared/catchAsync";

const getStats = catchAsync(async (req: Request, res: Response) => {
  const result = await getPublicStats();

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Stats fetched successfully",
    data: result,
  });
});

export { getStats };