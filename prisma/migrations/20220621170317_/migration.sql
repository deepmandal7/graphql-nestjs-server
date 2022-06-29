-- AlterTable
ALTER TABLE "timesheet_general_settings" ADD COLUMN     "auto_clock_out" TEXT NOT NULL DEFAULT E'12_hrs',
ADD COLUMN     "daily_limit" TEXT NOT NULL DEFAULT E'12_hrs';
