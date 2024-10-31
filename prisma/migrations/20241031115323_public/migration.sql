-- CreateTable
CREATE TABLE "stockorder" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalvalue" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ordereditem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "sku" TEXT NOT NULL,
    "quantityordered" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "stockorder_id_key" ON "stockorder"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ordereditem_id_key" ON "ordereditem"("id");

-- AddForeignKey
ALTER TABLE "stockorder" ADD CONSTRAINT "stockorder_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordereditem" ADD CONSTRAINT "ordereditem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "stockorder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
