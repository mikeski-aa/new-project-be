/*
  Warnings:

  - Added the required column `quantity` to the `soldProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "soldProduct" ADD COLUMN     "quantity" INTEGER NOT NULL;
