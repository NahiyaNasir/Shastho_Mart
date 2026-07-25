import { prisma } from "../../lib/prisma";

// Public, safe aggregate counts only — no revenue, no per-user data, no PII.
// Used by the public homepage's "Statistics" section.
const getPublicStats = async () => {
  const [totalMedicines, totalCategories, totalSellers, totalOrders] =
  
    await Promise.all([
        
      prisma.medicine.count(),
      prisma.categories.count(),
      prisma.user.count({ where: { role: "SELLER" } }),
      prisma.order.count(),
      
    ]);
console.log(prisma.medicine);
console.log(prisma.categories);
console.log(prisma.user);
console.log(prisma.order);
  return { totalMedicines, totalCategories, totalSellers, totalOrders };
};

export { getPublicStats };