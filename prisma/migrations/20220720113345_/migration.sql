/*
  Warnings:

  - Added the required column `timesheet_clockin_time` to the `time_entry_pending` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_work_in_ms` to the `time_entry_pending` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "time_entry_pending" ADD COLUMN     "timesheet_clockin_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "timesheet_clockout_time" TIMESTAMP(3),
ADD COLUMN     "total_hours_in_ms" INTEGER,
ADD COLUMN     "total_work_in_ms" INTEGER NOT NULL;
