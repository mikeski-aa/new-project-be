/*
  Warnings:

  - You are about to drop the `salereport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "soldProduct" DROP CONSTRAINT "soldProduct_reportId_fkey";

-- DropTable
DROP TABLE "salereport";

-- CreateTable
CREATE TABLE "eodreport" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "eodreport_id_key" ON "eodreport"("id");

-- AddForeignKey
ALTER TABLE "soldProduct" ADD CONSTRAINT "soldProduct_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "eodreport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
