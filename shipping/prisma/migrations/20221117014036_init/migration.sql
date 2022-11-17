-- CreateEnum
CREATE TYPE "Regions" AS ENUM ('NORTH', 'NORTHEAST', 'SOUTHEAST', 'SOUTH', 'MIDWEST');

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
CREATE UNIQUE INDEX "State_uf_key" ON "State"("uf");

-- CreateIndex
CREATE UNIQUE INDEX "City_siafiId_key" ON "City"("siafiId");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateUfCode_fkey" FOREIGN KEY ("stateUfCode") REFERENCES "State"("ufCode") ON DELETE RESTRICT ON UPDATE CASCADE;
