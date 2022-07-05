/*
  Warnings:

  - Made the column `timesheet_break_settings_id` on table `timesheet_manual_breaks` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "timesheet_manual_breaks" DROP CONSTRAINT "timesheet_manual_breaks_timesheet_break_settings_id_fkey";

-- AlterTable
ALTER TABLE "timesheet_break_settings" ALTER COLUMN "is_enabled" SET DEFAULT true,
ALTER COLUMN "break_configuration" SET DEFAULT E'MANUAL';

-- AlterTable
ALTER TABLE "timesheet_manual_breaks" ALTER COLUMN "timesheet_break_settings_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "timesheet_manual_breaks" ADD CONSTRAINT "timesheet_manual_breaks_timesheet_break_settings_id_fkey" FOREIGN KEY ("timesheet_break_settings_id") REFERENCES "timesheet_break_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
