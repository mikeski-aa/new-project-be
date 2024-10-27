/*
  Warnings:

  - Added the required column `purchasePrice` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "purchasePrice" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "salereport" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "salereport_id_key" ON "salereport"("id");
