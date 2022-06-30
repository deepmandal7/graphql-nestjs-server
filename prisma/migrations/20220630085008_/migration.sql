/*
  Warnings:

  - Made the column `timesheet_clockin_time` on table `timesheet_entry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "timesheet_entry" ALTER COLUMN "timesheet_clockin_time" SET NOT NULL;
