import { Medicine } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";




const createMedicineService = async (
  data: Omit<Medicine, "id" | "createdAt" | "updatedAt">,
  userId: string,
  categoryId: string
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

export { createMedicineService };