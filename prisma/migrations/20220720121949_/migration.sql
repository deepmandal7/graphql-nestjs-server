/*
  Warnings:

  - Added the required column `total_break_in_ms` to the `employee_break_pending` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee_break_pending" ADD COLUMN     "total_break_in_ms" INTEGER NOT NULL;
