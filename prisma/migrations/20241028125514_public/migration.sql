/*
  Warnings:

  - You are about to drop the `soldProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "soldProduct" DROP CONSTRAINT "soldProduct_reportId_fkey";

-- DropTable
DROP TABLE "soldProduct";

-- CreateTable
CREATE TABLE "soldproduct" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "purchasePrice" DOUBLE PRECISION NOT NULL,
    "sku" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantitySold" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reportId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "soldproduct_id_key" ON "soldproduct"("id");

-- AddForeignKey
ALTER TABLE "soldproduct" ADD CONSTRAINT "soldproduct_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "eodreport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
