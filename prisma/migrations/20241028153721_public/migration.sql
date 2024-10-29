-- AddForeignKey
ALTER TABLE "eodreport" ADD CONSTRAINT "eodreport_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
