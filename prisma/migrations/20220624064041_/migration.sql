/*
  Warnings:

  - You are about to drop the column `minimum_hours` on the `timesheet_general_settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "timesheet_general_settings" DROP COLUMN "minimum_hours",
ADD COLUMN     "enable_daily_timesheet_aprroval" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "minimum_hours_enum";
