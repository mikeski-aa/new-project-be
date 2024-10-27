-- AlterTable
ALTER TABLE "salereport" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "soldProduct" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "purchasePrice" DOUBLE PRECISION NOT NULL,
    "sku" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "soldProduct_id_key" ON "soldProduct"("id");

-- AddForeignKey
ALTER TABLE "soldProduct" ADD CONSTRAINT "soldProduct_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "salereport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
