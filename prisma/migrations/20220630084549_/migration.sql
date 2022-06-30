/*
  Warnings:

  - You are about to drop the column `enable_daily_timesheet_aprroval` on the `timesheet_general_settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "timesheet_general_settings" DROP COLUMN "enable_daily_timesheet_aprroval",
ADD COLUMN     "enable_daily_timesheet_approval" BOOLEAN NOT NULL DEFAULT true;
