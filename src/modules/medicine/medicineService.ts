
import { Medicine } from "../../../generated/prisma/client";
import { MedicineWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { QueryBuilder } from "../../utils/QueryBuilder";

const createMedicineService = async (
  data: Omit<Medicine, "id" | "createdAt" | "updatedAt">,
  userId: string,
  categoryId: string,
) => {
  const result = await prisma.medicine.create({
    data: {
      ...data,
      sellerId: userId,
      categoryId: categoryId,
    },
  });
  return result;
};

const getMedicineService = async (
  queryParams: Record<string, string | undefined>,
) => {
  const builder = new QueryBuilder<Medicine, MedicineWhereInput, Record<string, unknown>>(
    prisma.medicine,
    queryParams,
    {
      searchableFields: ["name", "description", "manufacturer", "category.name"],
      filterableFields: ["categoryId", "manufacturer", "sellerId", "price", "stock"],
    },
  );

  return builder
    .search()
    .filter()
    .paginate()
    .sort()
    .include({ category: true })
    .execute();
};

const getMedicineByIdService = async (medicineId: string) => {
  const result = await prisma.medicine.findUnique({
    where: { id: medicineId },
    include: { category: true },
  });
  return result;
};

const updateMedicineService = async (
  medicineId: string,
  data: Partial<Medicine>,
  sellerId: string,
) => {
  const medicineData = await prisma.medicine.findUniqueOrThrow({
    where: { id: medicineId },
    select: { sellerId: true },
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

const deleteMedicineService = async (
  medicineId: string,
  isAdmin: boolean,
  sellerId: string,
) => {
  const medicineData = await prisma.medicine.findUniqueOrThrow({
    where: { id: medicineId },
    select: { sellerId: true },
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