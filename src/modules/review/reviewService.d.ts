import { Review } from "../../../generated/prisma/client";
declare const createReviewService: (data: Omit<Review, "id" | "createdAt" | "updatedAt">, userId: string) => Promise<{
    id: string;
    createdAt: Date;
    userId: string;
    medicineId: string;
    rating: number;
    comment: string | null;
}>;
declare const getReviewsService: () => Promise<({
    user: {
        name: string;
        email: string;
        image: string | null;
        emailVerified: boolean;
    };
} & {
    id: string;
    createdAt: Date;
    userId: string;
    medicineId: string;
    rating: number;
    comment: string | null;
})[]>;
declare const updateReviewByUser: (userId: string, data: Partial<Review>, reviewId: string) => Promise<{
    id: string;
    createdAt: Date;
    userId: string;
    medicineId: string;
    rating: number;
    comment: string | null;
}>;
declare const deleteReviewByAdmin: (reviewId: string) => Promise<{
    id: string;
    createdAt: Date;
    userId: string;
    medicineId: string;
    rating: number;
    comment: string | null;
}>;
export { createReviewService, getReviewsService, updateReviewByUser, deleteReviewByAdmin };
//# sourceMappingURL=reviewService.d.ts.map