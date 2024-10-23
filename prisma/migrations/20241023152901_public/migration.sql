/*
  Warnings:

  - Added the required column `budgetValue` to the `budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "budget" ADD COLUMN     "budgetValue" DOUBLE PRECISION NOT NULL;
