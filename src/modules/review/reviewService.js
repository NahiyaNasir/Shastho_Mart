import { prisma } from "../../lib/prisma";
const createReviewService = async (data, userId) => {
    const existing = await prisma.review.findFirst({
        where: {
            userId: {
                equals: userId,
            },
            medicineId: {
                equals: data.medicineId,
            },
        },
    });
    if (existing) {
        throw new Error("You have already reviewed this medicine");
    }
    const result = await prisma.review.create({
        data: { ...data, userId: userId },
    });
    return result;
};
const getReviewsService = async () => {
    const review = await prisma.review.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    emailVerified: true,
                    image: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    return review;
};
const updateReviewByUser = async (userId, data, reviewId) => {
    const reviewData = await prisma.review.findUniqueOrThrow({
        where: { id: reviewId },
    });
    if (reviewData.userId !== userId) {
        throw new Error("You are not authorized to update this review");
    }
    const updatedReview = await prisma.review.update({
        where: { id: reviewId },
        data
    });
    return updatedReview;
};
const deleteReviewByAdmin = async (reviewId) => {
    const review = await prisma.review.findUniqueOrThrow({
        where: { id: reviewId },
    });
    if (!review) {
        throw new Error("Review not found");
    }
    return await prisma.review.delete({
        where: { id: reviewId }
    });
};
export { createReviewService, getReviewsService, updateReviewByUser, deleteReviewByAdmin };
//# sourceMappingURL=reviewService.js.map