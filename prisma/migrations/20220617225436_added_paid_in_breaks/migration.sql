/*
  Warnings:

  - Added the required column `paid` to the `employee_break` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee_break" ADD COLUMN     "paid" BOOLEAN NOT NULL;
