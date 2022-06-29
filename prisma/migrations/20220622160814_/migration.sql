/*
  Warnings:

  - Added the required column `status` to the `timesheet_jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timesheet_jobs" ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "all_user" SET DEFAULT false,
ALTER COLUMN "sub_jobs_enabled" SET DEFAULT true;
