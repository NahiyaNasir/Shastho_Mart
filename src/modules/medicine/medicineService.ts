import { Medicine } from "../../../generated/prisma/client";
import { MedicineWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

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

const getMedicineService = async ({
  search,
  category,
  manufacturer
}: {
  search: string | undefined;
 category: string | undefined;
 manufacturer: string | undefined;
}) => {
  const addCondition: MedicineWhereInput[] = [];
  if (search) {
    addCondition.push({
      OR: [
         { name: { contains: search, mode: "insensitive" },},
         { description: { contains: search, mode: "insensitive" },}
        
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
 if(manufacturer){
addCondition.push({
  manufacturer:{
    contains: manufacturer,
    mode: "insensitive"
  }
})
 }
//  console.log(manufacturer,"service");
  const result = await prisma.medicine.findMany({
    where: {
      AND: addCondition,
    },
    orderBy: {price: 'desc'}
  });
  return result;
};
const getMedicineByIdService = async (medicineId: string) => {
  const result = await prisma.medicine.findUnique({
    where: { id: medicineId },
  });
  return result;
}
 const updateMedicineService= async(medicineId:string, data:Partial<Medicine>,isAdmin:boolean, sellerId:string)=>{
   const  medicineData= await prisma.medicine .findUniqueOrThrow({
    where:{id:medicineId},
    select:{sellerId:true}
   })
   if(!isAdmin && medicineData.sellerId !== sellerId){
    throw new Error("You are unauthorized to update this medicine")
   }
   
  const result= await prisma.medicine.update({
    where:{id:medicineId},
    data,
  });
  return result;
}
 const deleteMedicineService= async(medicineId:string, isAdmin:boolean, sellerId:string)=>{
    const  medicineData= await prisma.medicine .findUniqueOrThrow({
    where:{id:medicineId},
    select:{sellerId:true}
   })
   if(!isAdmin && medicineData.sellerId !== sellerId){
    throw new Error("You are unauthorized to delete this medicine")
   }
   
  const result= await prisma.medicine.delete({
    where:{id:medicineId},
  });
  return result;
}
export { createMedicineService, getMedicineService, getMedicineByIdService, updateMedicineService, deleteMedicineService };