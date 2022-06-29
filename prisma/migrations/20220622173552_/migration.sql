/*
  Warnings:

  - Added the required column `status` to the `timesheet_sub_jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timesheet_sub_jobs" ADD COLUMN     "status" TEXT NOT NULL;
