-- CreateEnum
CREATE TYPE "StockEntryOperations" AS ENUM ('increment', 'decrement');

-- CreateTable
CREATE TABLE "StockEntry" (
    "id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "operation" "StockEntryOperations" NOT NULL,
    "idItem" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockEntry_pkey" PRIMARY KEY ("id")
);
