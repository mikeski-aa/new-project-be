/*
  Warnings:

  - Added the required column `totalSaleValue` to the `eodreport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantitySold` to the `soldProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "eodreport" ADD COLUMN     "totalSaleValue" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "soldProduct" ADD COLUMN     "quantitySold" INTEGER NOT NULL;
