import { Router } from "express";
import { createReview, getReviews, updateReview } from "./reviewController";
import auth, { UserRole } from "../../middleware/middleware";
import { deleteReviewByAdmin } from "./reviewService";
const router = Router();
router.get("/", getReviews);
router.post("/create", auth(UserRole.CUSTOMER), createReview);
router.patch("/:reviewId", auth(UserRole.CUSTOMER), updateReview);
router.delete("/:reviewId", auth(UserRole.ADMIN), deleteReviewByAdmin);
export { router as reviewRouter };
//# sourceMappingURL=reviewRoute.js.map