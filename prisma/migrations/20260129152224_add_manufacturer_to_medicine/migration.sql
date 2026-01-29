-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "manufacturer" TEXT;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
