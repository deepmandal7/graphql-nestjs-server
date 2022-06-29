/*
  Warnings:

  - You are about to drop the column `job_id` on the `time_entry` table. All the data in the column will be lost.
  - You are about to drop the `general_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_job` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[customization_settings_id]` on the table `timesheets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[payroll_settings_id]` on the table `timesheets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[geo_location_settings_id]` on the table `timesheets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reminder_settings_id]` on the table `timesheets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[notification_settings_id]` on the table `timesheets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customization_settings_id` to the `timesheets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `geo_location_settings_id` to the `timesheets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notification_settings_id` to the `timesheets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payroll_settings_id` to the `timesheets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reminder_settings_id` to the `timesheets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "pay_period_cycle_enum" AS ENUM ('MONTHLY', 'WEEKLY', 'BIWEEKLY', 'HALFMONTHLY');

-- CreateEnum
CREATE TYPE "geo_location_settings_enum" AS ENUM ('REQUIRED', 'OPTIONAL', 'OFF');

-- DropForeignKey
ALTER TABLE "time_entry" DROP CONSTRAINT "time_entry_job_id_fkey";

-- DropForeignKey
ALTER TABLE "time_entry" DROP CONSTRAINT "time_entry_sub_job_id_fkey";

-- DropForeignKey
ALTER TABLE "timesheets" DROP CONSTRAINT "timesheets_general_settings_id_fkey";

-- DropForeignKey
ALTER TABLE "workweeks" DROP CONSTRAINT "workweeks_general_settings_id_fkey";

-- AlterTable
ALTER TABLE "time_entry" DROP COLUMN "job_id";

-- AlterTable
ALTER TABLE "timesheets" ADD COLUMN     "customization_settings_id" INTEGER NOT NULL,
ADD COLUMN     "geo_location_settings_id" INTEGER NOT NULL,
ADD COLUMN     "notification_settings_id" INTEGER NOT NULL,
ADD COLUMN     "payroll_settings_id" INTEGER NOT NULL,
ADD COLUMN     "reminder_settings_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "general_settings";

-- DropTable
DROP TABLE "job";

-- DropTable
DROP TABLE "sub_job";

-- CreateTable
CREATE TABLE "timesheet_general_settings" (
    "id" SERIAL NOT NULL,
    "workweek_starts_on" INTEGER NOT NULL DEFAULT 1,
    "working_hours_calculation" "working_hours_calculation_enum" NOT NULL DEFAULT E'FIRSTLAST',
    "minimum_hours" "minimum_hours_enum" NOT NULL DEFAULT E'STRICT',
    "manual_or_shift_minimum_hours" "manual_or_shift_minimum_hours_enum" NOT NULL DEFAULT E'MANUAL',
    "minimum_hours_manual_full_day" TEXT NOT NULL DEFAULT E'08:00',
    "minimum_hours_manual_half_day" TEXT NOT NULL DEFAULT E'04:00',
    "payroll_export_time_format" TEXT NOT NULL DEFAULT E'12_hr',
    "timezone" TEXT NOT NULL DEFAULT E'Asia/Kolkata',
    "restrict_clock_in" BOOLEAN NOT NULL DEFAULT false,
    "restrict_clock_in_to" INTEGER NOT NULL DEFAULT 5,
    "restrict_clock_out" BOOLEAN NOT NULL DEFAULT false,
    "restrict_clock_out_to" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "timesheet_general_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_customization_settings" (
    "id" SERIAL NOT NULL,
    "allow_clock_in_out_web_browser" BOOLEAN NOT NULL,
    "allow_clock_in_out_mobile_app" BOOLEAN NOT NULL,
    "allow_clock_in_out_no_shecduled_shift" BOOLEAN NOT NULL,
    "allow_clock_in_out_mobile_app_timeclock" BOOLEAN NOT NULL,
    "direct_clock_in_out_schedule" BOOLEAN NOT NULL,
    "allow_clock_in_out_computer_timeclock" BOOLEAN NOT NULL,
    "allow_manual_shift_records_addition" BOOLEAN NOT NULL,
    "approval_manual_shift_records_addition" BOOLEAN NOT NULL,
    "approval_manual_shift_records_deletion" BOOLEAN NOT NULL,
    "approval_absence_addition" BOOLEAN NOT NULL,
    "approval_cloking_out_outside_geofence" BOOLEAN NOT NULL,

    CONSTRAINT "timesheet_customization_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_payroll_settings" (
    "id" SERIAL NOT NULL,
    "pay_period_cycle" "pay_period_cycle_enum" NOT NULL,
    "start_day" INTEGER NOT NULL,
    "end_day" INTEGER NOT NULL,
    "payroll_processing_day" INTEGER NOT NULL,
    "payroll_report_generation_day" INTEGER NOT NULL,
    "process_leave_encashment" BOOLEAN NOT NULL,
    "lock" BOOLEAN NOT NULL,

    CONSTRAINT "timesheet_payroll_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_job_settings" (
    "id" SERIAL NOT NULL,
    "job_title" TEXT NOT NULL,
    "sight_name" TEXT NOT NULL,
    "timesheets_id" INTEGER,

    CONSTRAINT "timesheet_job_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_sub_job_settings" (
    "id" SERIAL NOT NULL,
    "sub_job_title" TEXT NOT NULL,
    "job_settings_id" INTEGER NOT NULL,

    CONSTRAINT "timesheet_sub_job_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_geo_location_settings" (
    "id" SERIAL NOT NULL,
    "settings" "geo_location_settings_enum" NOT NULL,
    "breadcrumbs_enabled" BOOLEAN NOT NULL,

    CONSTRAINT "timesheet_geo_location_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_geo_location_job_settings" (
    "id" SERIAL NOT NULL,
    "sight_name" TEXT NOT NULL,
    "geo_location_settings_id" INTEGER NOT NULL,

    CONSTRAINT "timesheet_geo_location_job_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_reminder_settings" (
    "id" SERIAL NOT NULL,
    "before_start_enabled" BOOLEAN NOT NULL,
    "before_start" INTEGER NOT NULL,
    "after_start_enabled" BOOLEAN NOT NULL,
    "after_start" INTEGER NOT NULL,
    "before_end_enabled" BOOLEAN NOT NULL,
    "before_end" INTEGER NOT NULL,
    "after_end_enabled" BOOLEAN NOT NULL,
    "after_end" INTEGER NOT NULL,
    "no_check_in_enabled" BOOLEAN NOT NULL,
    "no_check_in_after" INTEGER NOT NULL,
    "no_check_out_enabled" BOOLEAN NOT NULL,
    "no_check_out_after" INTEGER NOT NULL,

    CONSTRAINT "timesheet_reminder_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_notification_settings" (
    "id" SERIAL NOT NULL,
    "user_request_absence_mobile" BOOLEAN NOT NULL,
    "user_request_absence_webpush" BOOLEAN NOT NULL,
    "user_request_absence_email" BOOLEAN NOT NULL,
    "user_new_shift_added_mobile" BOOLEAN NOT NULL,
    "user_new_shift_added_webpush" BOOLEAN NOT NULL,
    "user_new_shift_added_email" BOOLEAN NOT NULL,
    "user_edit_shift_mobile" BOOLEAN NOT NULL,
    "user_edit_shift_webpush" BOOLEAN NOT NULL,
    "user_edit_shift_email" BOOLEAN NOT NULL,
    "user_exceeds_mobile" BOOLEAN NOT NULL,
    "user_exceeds_webpush" BOOLEAN NOT NULL,
    "user_exceeds_email" BOOLEAN NOT NULL,
    "user_auto_clock_out_mobile" BOOLEAN NOT NULL,
    "user_auto_clock_out_webpush" BOOLEAN NOT NULL,
    "user_auto_clock_out_email" BOOLEAN NOT NULL,
    "user_pending" INTEGER NOT NULL,
    "user_pending_mobile" BOOLEAN NOT NULL,
    "user_pending_webpush" BOOLEAN NOT NULL,
    "user_pending_email" BOOLEAN NOT NULL,
    "admin_absence_approval_mobile" BOOLEAN NOT NULL,
    "admin_absence_approval_webpush" BOOLEAN NOT NULL,
    "admin_absence_approval_email" BOOLEAN NOT NULL,
    "admin_shift_approval_mobile" BOOLEAN NOT NULL,
    "admin_shift_approval_webpush" BOOLEAN NOT NULL,
    "admin_shift_approval_email" BOOLEAN NOT NULL,

    CONSTRAINT "timesheet_notification_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "timesheet_job_settings_sight_name_key" ON "timesheet_job_settings"("sight_name");

-- CreateIndex
CREATE UNIQUE INDEX "timesheet_sub_job_settings_job_settings_id_key" ON "timesheet_sub_job_settings"("job_settings_id");

-- CreateIndex
CREATE UNIQUE INDEX "timesheets_customization_settings_id_key" ON "timesheets"("customization_settings_id");

-- CreateIndex
CREATE UNIQUE INDEX "timesheets_payroll_settings_id_key" ON "timesheets"("payroll_settings_id");

-- CreateIndex
CREATE UNIQUE INDEX "timesheets_geo_location_settings_id_key" ON "timesheets"("geo_location_settings_id");

-- CreateIndex
CREATE UNIQUE INDEX "timesheets_reminder_settings_id_key" ON "timesheets"("reminder_settings_id");

-- CreateIndex
CREATE UNIQUE INDEX "timesheets_notification_settings_id_key" ON "timesheets"("notification_settings_id");

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_general_settings_id_fkey" FOREIGN KEY ("general_settings_id") REFERENCES "timesheet_general_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_customization_settings_id_fkey" FOREIGN KEY ("customization_settings_id") REFERENCES "timesheet_customization_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_payroll_settings_id_fkey" FOREIGN KEY ("payroll_settings_id") REFERENCES "timesheet_payroll_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_geo_location_settings_id_fkey" FOREIGN KEY ("geo_location_settings_id") REFERENCES "timesheet_geo_location_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_reminder_settings_id_fkey" FOREIGN KEY ("reminder_settings_id") REFERENCES "timesheet_reminder_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_notification_settings_id_fkey" FOREIGN KEY ("notification_settings_id") REFERENCES "timesheet_notification_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workweeks" ADD CONSTRAINT "workweeks_general_settings_id_fkey" FOREIGN KEY ("general_settings_id") REFERENCES "timesheet_general_settings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_job_settings" ADD CONSTRAINT "timesheet_job_settings_timesheets_id_fkey" FOREIGN KEY ("timesheets_id") REFERENCES "timesheets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_sub_job_settings" ADD CONSTRAINT "timesheet_sub_job_settings_job_settings_id_fkey" FOREIGN KEY ("job_settings_id") REFERENCES "timesheet_job_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_geo_location_job_settings" ADD CONSTRAINT "timesheet_geo_location_job_settings_sight_name_fkey" FOREIGN KEY ("sight_name") REFERENCES "timesheet_job_settings"("sight_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_geo_location_job_settings" ADD CONSTRAINT "timesheet_geo_location_job_settings_geo_location_settings__fkey" FOREIGN KEY ("geo_location_settings_id") REFERENCES "timesheet_geo_location_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
