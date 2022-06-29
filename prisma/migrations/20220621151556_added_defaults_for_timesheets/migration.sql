/*
  Warnings:

  - Made the column `timesheets_id` on table `timesheet_job_settings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "timesheet_job_settings" DROP CONSTRAINT "timesheet_job_settings_timesheets_id_fkey";

-- AlterTable
ALTER TABLE "timesheet_customization_settings" ALTER COLUMN "allow_clock_in_out_web_browser" SET DEFAULT true,
ALTER COLUMN "allow_clock_in_out_mobile_app" SET DEFAULT true,
ALTER COLUMN "allow_clock_in_out_no_shecduled_shift" SET DEFAULT true,
ALTER COLUMN "allow_clock_in_out_mobile_app_timeclock" SET DEFAULT true,
ALTER COLUMN "direct_clock_in_out_schedule" SET DEFAULT true,
ALTER COLUMN "allow_clock_in_out_computer_timeclock" SET DEFAULT true,
ALTER COLUMN "allow_manual_shift_records_addition" SET DEFAULT true,
ALTER COLUMN "approval_manual_shift_records_addition" SET DEFAULT true,
ALTER COLUMN "approval_manual_shift_records_deletion" SET DEFAULT true,
ALTER COLUMN "approval_absence_addition" SET DEFAULT true,
ALTER COLUMN "approval_cloking_out_outside_geofence" SET DEFAULT true;

-- AlterTable
ALTER TABLE "timesheet_geo_location_settings" ALTER COLUMN "settings" SET DEFAULT E'REQUIRED',
ALTER COLUMN "breadcrumbs_enabled" SET DEFAULT true;

-- AlterTable
ALTER TABLE "timesheet_job_settings" ALTER COLUMN "sight_name" DROP NOT NULL,
ALTER COLUMN "timesheets_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "timesheet_notification_settings" ALTER COLUMN "user_request_absence_mobile" SET DEFAULT true,
ALTER COLUMN "user_request_absence_webpush" SET DEFAULT true,
ALTER COLUMN "user_request_absence_email" SET DEFAULT true,
ALTER COLUMN "user_new_shift_added_mobile" SET DEFAULT true,
ALTER COLUMN "user_new_shift_added_webpush" SET DEFAULT true,
ALTER COLUMN "user_new_shift_added_email" SET DEFAULT true,
ALTER COLUMN "user_edit_shift_mobile" SET DEFAULT true,
ALTER COLUMN "user_edit_shift_webpush" SET DEFAULT true,
ALTER COLUMN "user_edit_shift_email" SET DEFAULT true,
ALTER COLUMN "user_exceeds_mobile" SET DEFAULT true,
ALTER COLUMN "user_exceeds_webpush" SET DEFAULT true,
ALTER COLUMN "user_exceeds_email" SET DEFAULT true,
ALTER COLUMN "user_auto_clock_out_mobile" SET DEFAULT true,
ALTER COLUMN "user_auto_clock_out_webpush" SET DEFAULT true,
ALTER COLUMN "user_auto_clock_out_email" SET DEFAULT true,
ALTER COLUMN "user_pending" SET DEFAULT 5,
ALTER COLUMN "user_pending_mobile" SET DEFAULT true,
ALTER COLUMN "user_pending_webpush" SET DEFAULT true,
ALTER COLUMN "user_pending_email" SET DEFAULT true,
ALTER COLUMN "admin_absence_approval_mobile" SET DEFAULT true,
ALTER COLUMN "admin_absence_approval_webpush" SET DEFAULT true,
ALTER COLUMN "admin_absence_approval_email" SET DEFAULT true,
ALTER COLUMN "admin_shift_approval_mobile" SET DEFAULT true,
ALTER COLUMN "admin_shift_approval_webpush" SET DEFAULT true,
ALTER COLUMN "admin_shift_approval_email" SET DEFAULT true;

-- AlterTable
ALTER TABLE "timesheet_payroll_settings" ALTER COLUMN "pay_period_cycle" SET DEFAULT E'MONTHLY',
ALTER COLUMN "start_day" SET DEFAULT 1,
ALTER COLUMN "end_day" SET DEFAULT 30,
ALTER COLUMN "payroll_processing_day" SET DEFAULT 30,
ALTER COLUMN "payroll_report_generation_day" SET DEFAULT 30,
ALTER COLUMN "process_leave_encashment" SET DEFAULT true,
ALTER COLUMN "lock" SET DEFAULT false;

-- AlterTable
ALTER TABLE "timesheet_reminder_settings" ALTER COLUMN "before_start_enabled" SET DEFAULT true,
ALTER COLUMN "before_start" SET DEFAULT 5,
ALTER COLUMN "after_start_enabled" SET DEFAULT true,
ALTER COLUMN "after_start" SET DEFAULT 5,
ALTER COLUMN "before_end_enabled" SET DEFAULT true,
ALTER COLUMN "before_end" SET DEFAULT 5,
ALTER COLUMN "after_end_enabled" SET DEFAULT true,
ALTER COLUMN "after_end" SET DEFAULT 5,
ALTER COLUMN "no_check_in_enabled" SET DEFAULT true,
ALTER COLUMN "no_check_in_after" SET DEFAULT 5,
ALTER COLUMN "no_check_out_enabled" SET DEFAULT true,
ALTER COLUMN "no_check_out_after" SET DEFAULT 5;

-- AddForeignKey
ALTER TABLE "timesheet_job_settings" ADD CONSTRAINT "timesheet_job_settings_timesheets_id_fkey" FOREIGN KEY ("timesheets_id") REFERENCES "timesheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
