/*
  Warnings:

  - A unique constraint covering the columns `[name,county]` on the table `Market` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Market_name_county_key" ON "public"."Market"("name", "county");
