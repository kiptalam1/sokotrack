/*
  Warnings:

  - Made the column `countyId` on table `Market` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Market" DROP CONSTRAINT "Market_countyId_fkey";

-- AlterTable
ALTER TABLE "public"."Market" ALTER COLUMN "countyId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Market" ADD CONSTRAINT "Market_countyId_fkey" FOREIGN KEY ("countyId") REFERENCES "public"."County"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
