/*
  Warnings:

  - You are about to drop the column `manufacturer` on the `Medicine` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Medicine` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - A unique constraint covering the columns `[name,sellerId]` on the table `Medicine` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `genericName` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Medicine` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('Pcs', 'Strip', 'Box', 'Bottle');

-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "manufacturer",
ADD COLUMN     "discountPrice" DECIMAL(10,2),
ADD COLUMN     "expiryDate" TIMESTAMP(3),
ADD COLUMN     "genericName" VARCHAR(200) NOT NULL,
ADD COLUMN     "group" VARCHAR(255),
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "isPrescriptionRequired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "sku" VARCHAR(100),
ADD COLUMN     "strength" VARCHAR(50),
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "unitType" "UnitType" NOT NULL DEFAULT 'Pcs',
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "stock" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "_SellerMedicines" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SellerMedicines_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SellerMedicines_B_index" ON "_SellerMedicines"("B");

-- CreateIndex
CREATE INDEX "Medicine_categoryId_idx" ON "Medicine"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_name_sellerId_key" ON "Medicine"("name", "sellerId");

-- AddForeignKey
ALTER TABLE "_SellerMedicines" ADD CONSTRAINT "_SellerMedicines_A_fkey" FOREIGN KEY ("A") REFERENCES "Medicine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SellerMedicines" ADD CONSTRAINT "_SellerMedicines_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
