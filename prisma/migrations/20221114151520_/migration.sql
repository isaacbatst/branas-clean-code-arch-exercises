-- CreateEnum
CREATE TYPE "Regions" AS ENUM ('NORTH', 'NORTHEAST', 'SOUTHEAST', 'SOUTH', 'MIDWEST');

-- CreateTable
CREATE TABLE "Coupon" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "expireDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "height" DECIMAL(65,30) NOT NULL,
    "width" DECIMAL(65,30) NOT NULL,
    "depth" DECIMAL(65,30) NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "addressCep" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "couponCode" TEXT,
    "total" DECIMAL(10,2) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "destination" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "ufCode" INTEGER NOT NULL,
    "uf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DECIMAL(10,5) NOT NULL,
    "longitude" DECIMAL(10,5) NOT NULL,
    "region" "Regions" NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("ufCode")
);

-- CreateTable
CREATE TABLE "City" (
    "ibgeCode" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DECIMAL(10,5) NOT NULL,
    "longitude" DECIMAL(10,5) NOT NULL,
    "capital" BOOLEAN NOT NULL,
    "siafiId" INTEGER NOT NULL,
    "ddd" INTEGER NOT NULL,
    "timezone" TEXT NOT NULL,
    "stateUfCode" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("ibgeCode")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Order_code_key" ON "Order"("code");

-- CreateIndex
CREATE UNIQUE INDEX "State_uf_key" ON "State"("uf");

-- CreateIndex
CREATE UNIQUE INDEX "City_siafiId_key" ON "City"("siafiId");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_couponCode_fkey" FOREIGN KEY ("couponCode") REFERENCES "Coupon"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateUfCode_fkey" FOREIGN KEY ("stateUfCode") REFERENCES "State"("ufCode") ON DELETE RESTRICT ON UPDATE CASCADE;
