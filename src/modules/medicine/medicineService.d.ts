import { Medicine } from "../../../generated/prisma/client";
declare const createMedicineService: (data: Omit<Medicine, "id" | "createdAt" | "updatedAt">, userId: string, categoryId: string) => Promise<{
    name: string;
    id: string;
    description: string | null;
    price: number;
    stock: number;
    manufacturer: string | null;
    categoryId: string;
    sellerId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getMedicineService: ({ search, category, manufacturer, page, limit, skip, sortBy, sortOrder }: {
    search: string | undefined;
    category: string | undefined;
    manufacturer: string | undefined;
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string | undefined;
}) => Promise<{
    date: ({
        category: {
            name: string;
            id: string;
            createdAt: Date;
        };
    } & {
        name: string;
        id: string;
        description: string | null;
        price: number;
        stock: number;
        manufacturer: string | null;
        categoryId: string;
        sellerId: string;
        createdAt: Date;
        updatedAt: Date;
    })[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}>;
declare const getMedicineByIdService: (medicineId: string) => Promise<{
    name: string;
    id: string;
    description: string | null;
    price: number;
    stock: number;
    manufacturer: string | null;
    categoryId: string;
    sellerId: string;
    createdAt: Date;
    updatedAt: Date;
} | null>;
declare const updateMedicineService: (medicineId: string, data: Partial<Medicine>, sellerId: string) => Promise<{
    name: string;
    id: string;
    description: string | null;
    price: number;
    stock: number;
    manufacturer: string | null;
    categoryId: string;
    sellerId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const deleteMedicineService: (medicineId: string, isAdmin: boolean, sellerId: string) => Promise<{
    name: string;
    id: string;
    description: string | null;
    price: number;
    stock: number;
    manufacturer: string | null;
    categoryId: string;
    sellerId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export { createMedicineService, getMedicineService, getMedicineByIdService, updateMedicineService, deleteMedicineService };
//# sourceMappingURL=medicineService.d.ts.map