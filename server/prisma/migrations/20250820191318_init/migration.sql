-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('admin', 'officer');

-- CreateEnum
CREATE TYPE "public"."StallType" AS ENUM ('retail', 'wholesale', 'food', 'other');

-- CreateEnum
CREATE TYPE "public"."StallStatus" AS ENUM ('available', 'occupied', 'maintenance');

-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('active', 'ended', 'pending');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('mpesa', 'cash', 'bank');

-- CreateEnum
CREATE TYPE "public"."MaintenanceStatus" AS ENUM ('open', 'in_progress', 'closed');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Market" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "county" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Market_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Stall" (
    "id" SERIAL NOT NULL,
    "marketId" INTEGER NOT NULL,
    "stallNumber" TEXT NOT NULL,
    "type" "public"."StallType" NOT NULL,
    "status" "public"."StallStatus" NOT NULL DEFAULT 'available',
    "monthlyRent" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Stall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Trader" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Booking" (
    "id" SERIAL NOT NULL,
    "stallId" INTEGER NOT NULL,
    "traderId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "method" "public"."PaymentMethod" NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MaintenanceRequest" (
    "id" SERIAL NOT NULL,
    "stallId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "status" "public"."MaintenanceStatus" NOT NULL DEFAULT 'open',
    "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MaintenanceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Stall_marketId_stallNumber_key" ON "public"."Stall"("marketId", "stallNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Trader_nationalId_key" ON "public"."Trader"("nationalId");

-- CreateIndex
CREATE UNIQUE INDEX "Trader_email_key" ON "public"."Trader"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_stallId_traderId_startDate_key" ON "public"."Booking"("stallId", "traderId", "startDate");

-- AddForeignKey
ALTER TABLE "public"."Stall" ADD CONSTRAINT "Stall_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "public"."Market"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_stallId_fkey" FOREIGN KEY ("stallId") REFERENCES "public"."Stall"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_traderId_fkey" FOREIGN KEY ("traderId") REFERENCES "public"."Trader"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_stallId_fkey" FOREIGN KEY ("stallId") REFERENCES "public"."Stall"("id") ON DELETE CASCADE ON UPDATE CASCADE;
