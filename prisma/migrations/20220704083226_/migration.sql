/*
  Warnings:

  - Added the required column `entry_date` to the `timesheet_entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timesheet_entry" ADD COLUMN     "entry_date" DATE NOT NULL;
