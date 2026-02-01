import { prisma } from "../../lib/prisma";
const createMedicineService = async (data, userId, categoryId) => {
    const result = await prisma.medicine.create({
        data: {
            ...data,
            sellerId: userId,
            categoryId: categoryId,
        },
    });
    return result;
};
const getMedicineService = async ({ search, category, manufacturer, page, limit, skip, sortBy, sortOrder }) => {
    const addCondition = [];
    if (search) {
        addCondition.push({
            OR: [
                { name: { contains: search, mode: "insensitive" }, },
                { description: { contains: search, mode: "insensitive" }, }
            ],
        });
    }
    if (category) {
        addCondition.push({
            category: {
                name: {
                    equals: category,
                    mode: "insensitive"
                }
            }
        });
    }
    if (manufacturer) {
        addCondition.push({
            manufacturer: {
                contains: manufacturer,
                mode: "insensitive"
            }
        });
    }
    //  console.log(manufacturer,"service");
    const allMedicine = await prisma.medicine.findMany({
        skip,
        take: limit,
        where: {
            AND: addCondition,
        },
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            category: true
        }
    });
    const total = await prisma.medicine.count({
        where: {
            AND: addCondition,
        }
    });
    return {
        date: allMedicine,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};
const getMedicineByIdService = async (medicineId) => {
    const result = await prisma.medicine.findUnique({
        where: { id: medicineId },
    });
    return result;
};
const updateMedicineService = async (medicineId, data, sellerId) => {
    const medicineData = await prisma.medicine.findUniqueOrThrow({
        where: { id: medicineId },
        select: { sellerId: true }
    });
    if (medicineData.sellerId !== sellerId) {
        throw new Error("You are unauthorized to update this medicine");
    }
    const result = await prisma.medicine.update({
        where: { id: medicineId },
        data,
    });
    return result;
};
const deleteMedicineService = async (medicineId, isAdmin, sellerId) => {
    const medicineData = await prisma.medicine.findUniqueOrThrow({
        where: { id: medicineId },
        select: { sellerId: true }
    });
    if (!isAdmin && medicineData.sellerId !== sellerId) {
        throw new Error("You are unauthorized to delete this medicine");
    }
    const result = await prisma.medicine.delete({
        where: { id: medicineId },
    });
    return result;
};
export { createMedicineService, getMedicineService, getMedicineByIdService, updateMedicineService, deleteMedicineService };
//# sourceMappingURL=medicineService.js.map