import { Review } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { QueryBuilder } from "../../utils/QueryBuilder";

const createReviewService = async (
  data: Omit<Review, "id" | "createdAt" | "updatedAt">,
  userId: string,
) => {
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

const getReviewsService = async (
  queryParams: Record<string, string | undefined> = {},
) => {
  const builder = new QueryBuilder<Review, Record<string, unknown>, Record<string, unknown>>(
    prisma.review,
    queryParams,
    {
      searchableFields: ["comment", "user.name", "user.email"],
      filterableFields: ["rating", "medicineId", "userId"],
    },
  );

  return builder
    .search()
    .filter()
    .paginate()
    .sort()
    .include({
      user: {
        select: {
          name: true,
          email: true,
          emailVerified: true,
          image: true,
        },
      },
      medicine: {
        select: {
          name: true,
          manufacturer: true,
        },
      },
    })
    .execute();
};

const updateReviewByUser = async (userId: string, data: Partial<Review>, reviewId: string) => {
  const reviewData = await prisma.review.findUniqueOrThrow({
    where: { id: reviewId },
  });
  if (reviewData.userId !== userId) {
    throw new Error("You are not authorized to update this review");
  }
  const updatedReview = await prisma.review.update({
    where: { id: reviewId },
    data,
  });
  return updatedReview;
};

const deleteReviewByAdmin = async (reviewId: string) => {
  const review = await prisma.review.findUniqueOrThrow({
    where: { id: reviewId },
  });
  return await prisma.review.delete({
    where: { id: reviewId },
  });
};
  
export { createReviewService, getReviewsService, updateReviewByUser, deleteReviewByAdmin };