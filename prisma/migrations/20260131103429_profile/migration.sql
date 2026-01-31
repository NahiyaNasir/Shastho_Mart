/*
  Warnings:

  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('BAN', 'UNBAN');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "phone",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'UNBAN';

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" VARCHAR(300),
    "address" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
