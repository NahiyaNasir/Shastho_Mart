import { Router } from "express";

import { createReview, getReviews, updateReview, deleteReview } from "./reviewController";
import auth, { UserRole } from "../../middleware/middleware";


 const router=Router()
 router.get("/", getReviews);
  router.post("/create",auth(UserRole.CUSTOMER), createReview);
  router.patch("/:reviewId",auth(UserRole.CUSTOMER), updateReview);
  router.delete("/:reviewId",auth(UserRole.ADMIN), deleteReview);
    export { router as reviewRouter };