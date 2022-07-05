/*
  Warnings:

  - Added the required column `total_break_in_ms` to the `timesheet_entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timesheet_entry" ADD COLUMN     "total_break_in_ms" INTEGER NOT NULL;
