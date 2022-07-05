/*
  Warnings:

  - Added the required column `total_work_hours` to the `timesheet_entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timesheet_entry" ADD COLUMN     "total_work_hours" INTEGER NOT NULL;
