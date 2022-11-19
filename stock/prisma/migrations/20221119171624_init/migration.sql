-- CreateEnum
CREATE TYPE "StockEntryOperations" AS ENUM ('increment', 'decrement');

-- CreateTable
CREATE TABLE "StockEntry" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "operation" "StockEntryOperations" NOT NULL,
    "idItem" INTEGER NOT NULL,

    CONSTRAINT "StockEntry_pkey" PRIMARY KEY ("id")
);
