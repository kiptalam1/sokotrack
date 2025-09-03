/*
  Warnings:

  - You are about to drop the column `county` on the `Market` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,countyId]` on the table `Market` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Market_name_county_key";

-- AlterTable
ALTER TABLE "public"."Market" DROP COLUMN "county",
ADD COLUMN     "countyId" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "countyId" TEXT;

-- CreateTable
CREATE TABLE "public"."County" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "County_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "County_name_key" ON "public"."County"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Market_name_countyId_key" ON "public"."Market"("name", "countyId");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_countyId_fkey" FOREIGN KEY ("countyId") REFERENCES "public"."County"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Market" ADD CONSTRAINT "Market_countyId_fkey" FOREIGN KEY ("countyId") REFERENCES "public"."County"("id") ON DELETE SET NULL ON UPDATE CASCADE;
