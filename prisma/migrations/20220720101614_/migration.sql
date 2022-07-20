-- CreateEnum
CREATE TYPE "can_create_enum" AS ENUM ('EVERYONE', 'ADMIN');

-- CreateEnum
CREATE TYPE "task_frequency_enum" AS ENUM ('ONEOFF', 'RECURRING');

-- CreateEnum
CREATE TYPE "repeat_type_enum" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "timesheet_entry_status_enum" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'DELETED');

-- CreateEnum
CREATE TYPE "DayTypeEnum" AS ENUM ('NEXT', 'PREVIOUS', 'CURRENT');

-- CreateEnum
CREATE TYPE "time_entry_status_enum" AS ENUM ('PENDING', 'DELETED');

-- CreateEnum
CREATE TYPE "employee_break_enum" AS ENUM ('DELETED');

-- CreateEnum
CREATE TYPE "working_hours_calculation_enum" AS ENUM ('FIRSTLAST', 'EVERY');

-- CreateEnum
CREATE TYPE "manual_or_shift_minimum_hours_enum" AS ENUM ('MANUAL', 'SHIFT');

-- CreateEnum
CREATE TYPE "payroll_export_time_format_enum" AS ENUM ('DECIMAL', 'MINUTES');

-- CreateEnum
CREATE TYPE "pay_period_cycle_enum" AS ENUM ('MONTHLY', 'WEEKLY', 'BIWEEKLY', 'HALFMONTHLY');

-- CreateEnum
CREATE TYPE "break_configuration" AS ENUM ('MANUAL', 'AUTOMATIC');

-- CreateEnum
CREATE TYPE "paid_type_enum" AS ENUM ('PAID', 'UNPAID');

-- CreateEnum
CREATE TYPE "geo_location_settings_enum" AS ENUM ('REQUIRED', 'OPTIONAL', 'OFF');

-- CreateEnum
CREATE TYPE "time_off_type_units_enum" AS ENUM ('DAYS');

-- CreateEnum
CREATE TYPE "time_off_type_status_enum" AS ENUM ('ACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "leave_type_enum" AS ENUM ('ALL', 'PARTIAL');

-- CreateEnum
CREATE TYPE "time_off_status_enum" AS ENUM ('APPROVED', 'REJECTED', 'PENDING', 'DELETED');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email_id" TEXT,
    "org_id" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization" (
    "id" SERIAL NOT NULL,
    "org_name" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_board" (
    "id" SERIAL NOT NULL,
    "task_board_name" TEXT NOT NULL,
    "org_id" INTEGER NOT NULL,
    "can_create" "can_create_enum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER NOT NULL,
    "task_board_status" TEXT,

    CONSTRAINT "task_board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_board_customisation" (
    "id" SERIAL NOT NULL,
    "field_name" TEXT NOT NULL,
    "visibility" BOOLEAN NOT NULL DEFAULT true,
    "mandatory" BOOLEAN NOT NULL DEFAULT true,
    "task_board_id" INTEGER,

    CONSTRAINT "task_board_customisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "task_title" TEXT,
    "task_description" TEXT,
    "task_file_id" TEXT[],
    "task_frequency" "task_frequency_enum" NOT NULL,
    "task_start_date_time" TIMESTAMP(3),
    "task_end_date_time" TIMESTAMP(3),
    "task_coordinates" DOUBLE PRECISION[],
    "task_location" TEXT,
    "task_board_id" INTEGER NOT NULL,
    "task_status" TEXT NOT NULL DEFAULT E'Open',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by_id" INTEGER,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_task" (
    "id" SERIAL NOT NULL,
    "task_description" TEXT NOT NULL,
    "task_id" INTEGER NOT NULL,
    "task_status" TEXT NOT NULL DEFAULT E'Scheduled',
    "sub_task_start_date_time" TIMESTAMP(3),
    "sub_task_end_date_time" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER NOT NULL,

    CONSTRAINT "sub_task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repeat_details" (
    "id" SERIAL NOT NULL,
    "stop_repeat" TIMESTAMP(3),
    "repeat_type" "repeat_type_enum" NOT NULL,
    "task_id" INTEGER NOT NULL,
    "how_often_repeat" INTEGER,
    "day_of_week" INTEGER[],
    "day_of_month" INTEGER,
    "week_of_month" INTEGER,
    "month_of_year" INTEGER,

    CONSTRAINT "repeat_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "tag_name" TEXT NOT NULL,
    "tag_color" TEXT NOT NULL,
    "tag_status" TEXT,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_tag" (
    "task_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "task_tag_pkey" PRIMARY KEY ("task_id","tag_id")
);

-- CreateTable
CREATE TABLE "task_comments" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "task_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "task_comments_status" TEXT,

    CONSTRAINT "task_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheets" (
    "id" SERIAL NOT NULL,
    "timeclock_name" TEXT NOT NULL,
    "assign_to_all" BOOLEAN,
    "group_ids" INTEGER[],
    "org_id" INTEGER NOT NULL,
    "created_by_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "general_settings_id" INTEGER NOT NULL,
    "customization_settings_id" INTEGER NOT NULL,
    "payroll_settings_id" INTEGER NOT NULL,
    "geo_location_settings_id" INTEGER NOT NULL,
    "reminder_settings_id" INTEGER NOT NULL,
    "notification_settings_id" INTEGER NOT NULL,
    "timesheet_break_settings_id" INTEGER NOT NULL,

    CONSTRAINT "timesheets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_entry" (
    "id" SERIAL NOT NULL,
    "timesheet_id" INTEGER NOT NULL,
    "status" "timesheet_entry_status_enum" NOT NULL DEFAULT E'PENDING',
    "user_id" INTEGER NOT NULL,
    "entry_date" DATE NOT NULL,
    "timesheet_clockin_time" TIMESTAMP(3) NOT NULL,
    "timesheet_clockout_time" TIMESTAMP(3),
    "total_work_in_ms" INTEGER NOT NULL,
    "total_break_in_ms" INTEGER,
    "total_hours_in_ms" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by_id" INTEGER NOT NULL,

    CONSTRAINT "timesheet_entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_entry" (
    "id" SERIAL NOT NULL,
    "timesheet_entry_id" INTEGER NOT NULL,
    "check_in_time" TIMESTAMP(3) NOT NULL,
    "check_in_day_type" "DayTypeEnum" NOT NULL,
    "check_out_time" TIMESTAMP(3),
    "check_out_day_type" "DayTypeEnum",
    "comments" TEXT,
    "timesheets_id" INTEGER,
    "timesheet_jobs_id" INTEGER,
    "timesheet_sub_jobs_id" INTEGER,
    "created_by_id" INTEGER NOT NULL,
    "status" "time_entry_status_enum",

    CONSTRAINT "time_entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_entry_pending" (
    "id" SERIAL NOT NULL,
    "check_in_time" TIMESTAMP(3) NOT NULL,
    "check_in_day_type" "DayTypeEnum" NOT NULL,
    "check_out_time" TIMESTAMP(3),
    "check_out_day_type" "DayTypeEnum",
    "timesheet_jobs_id" INTEGER,
    "timesheet_sub_jobs_id" INTEGER,
    "created_by_id" INTEGER NOT NULL,
    "time_entry_id" INTEGER NOT NULL,
    "timesheet_id" INTEGER NOT NULL,

    CONSTRAINT "time_entry_pending_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_break" (
    "id" SERIAL NOT NULL,
    "timesheet_manual_breaks_id" INTEGER,
    "duration" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "start_day_type" "DayTypeEnum" NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "end_day_type" "DayTypeEnum" NOT NULL,
    "status" "employee_break_enum",
    "timesheet_entry_id" INTEGER NOT NULL,

    CONSTRAINT "employee_break_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "positions" (
    "id" SERIAL NOT NULL,
    "position_title" TEXT NOT NULL,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workweeks" (
    "id" SERIAL NOT NULL,
    "general_settings_id" INTEGER,
    "monday" BOOLEAN NOT NULL DEFAULT true,
    "monday_start_time" TEXT NOT NULL DEFAULT E'00:00',
    "monday_end_time" TEXT NOT NULL DEFAULT E'00:00',
    "tuesday" BOOLEAN NOT NULL DEFAULT true,
    "tuesday_start_time" TEXT NOT NULL DEFAULT E'00:00',
    "tuesday_end_time" TEXT NOT NULL DEFAULT E'00:00',
    "wednesday" BOOLEAN NOT NULL DEFAULT true,
    "wednesday_start_time" TEXT NOT NULL DEFAULT E'00:00',
    "wednesday_end_time" TEXT NOT NULL DEFAULT E'00:00',
    "thursday" BOOLEAN NOT NULL DEFAULT true,
    "thursday_start_time" TEXT NOT NULL DEFAULT E'00:00',
    "thursday_end_time" TEXT NOT NULL DEFAULT E'00:00',
    "friday" BOOLEAN NOT NULL DEFAULT true,
    "friday_start_time" TEXT NOT NULL DEFAULT E'00:00',
    "friday_end_time" TEXT NOT NULL DEFAULT E'00:00',
    "saturday" BOOLEAN NOT NULL DEFAULT false,
    "saturday_start_time" TEXT NOT NULL DEFAULT E'00:00',
    "saturday_end_time" TEXT NOT NULL DEFAULT E'00:00',
    "sunday" BOOLEAN NOT NULL DEFAULT false,
    "sunday_start_time" TEXT NOT NULL DEFAULT E'00:00',
    "sunday_end_time" TEXT NOT NULL DEFAULT E'00:00',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workweeks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_general_settings" (
    "id" SERIAL NOT NULL,
    "workweek_starts_on" INTEGER NOT NULL DEFAULT 1,
    "working_hours_calculation" "working_hours_calculation_enum" NOT NULL DEFAULT E'FIRSTLAST',
    "daily_limit" TEXT NOT NULL DEFAULT E'12_hrs',
    "auto_clock_out" TEXT NOT NULL DEFAULT E'12_hrs',
    "manual_or_shift_minimum_hours" "manual_or_shift_minimum_hours_enum" NOT NULL DEFAULT E'MANUAL',
    "minimum_hours_manual_full_day" TEXT NOT NULL DEFAULT E'08:00',
    "minimum_hours_manual_half_day" TEXT NOT NULL DEFAULT E'04:00',
    "payroll_export_time_format" "payroll_export_time_format_enum" NOT NULL DEFAULT E'MINUTES',
    "timezone" TEXT NOT NULL DEFAULT E'Asia/Kolkata',
    "restrict_clock_in" BOOLEAN NOT NULL DEFAULT false,
    "restrict_clock_in_to" INTEGER NOT NULL DEFAULT 5,
    "restrict_clock_out" BOOLEAN NOT NULL DEFAULT false,
    "enable_daily_timesheet_approval" BOOLEAN NOT NULL DEFAULT true,
    "restrict_clock_out_to" INTEGER NOT NULL DEFAULT 5,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timesheet_general_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_customization_settings" (
    "id" SERIAL NOT NULL,
    "allow_clock_in_out_web_browser" BOOLEAN NOT NULL DEFAULT true,
    "allow_clock_in_out_mobile_app" BOOLEAN NOT NULL DEFAULT true,
    "allow_clock_in_out_no_shecduled_shift" BOOLEAN NOT NULL DEFAULT true,
    "allow_clock_in_out_mobile_app_timeclock" BOOLEAN NOT NULL DEFAULT true,
    "direct_clock_in_out_schedule" BOOLEAN NOT NULL DEFAULT true,
    "allow_clock_in_out_computer_timeclock" BOOLEAN NOT NULL DEFAULT true,
    "allow_manual_shift_records_addition" BOOLEAN NOT NULL DEFAULT true,
    "approval_manual_shift_records_addition" BOOLEAN NOT NULL DEFAULT true,
    "approval_manual_shift_records_deletion" BOOLEAN NOT NULL DEFAULT true,
    "approval_absence_addition" BOOLEAN NOT NULL DEFAULT true,
    "approval_cloking_out_outside_geofence" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timesheet_customization_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_payroll_settings" (
    "id" SERIAL NOT NULL,
    "pay_period_cycle" "pay_period_cycle_enum" NOT NULL DEFAULT E'MONTHLY',
    "start_day" INTEGER NOT NULL DEFAULT 1,
    "end_day" INTEGER NOT NULL DEFAULT 30,
    "payroll_processing_day" INTEGER NOT NULL DEFAULT 30,
    "payroll_report_generation_day" INTEGER NOT NULL DEFAULT 30,
    "process_leave_encashment" BOOLEAN NOT NULL DEFAULT true,
    "lock" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timesheet_payroll_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_break_settings" (
    "id" SERIAL NOT NULL,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "break_configuration" "break_configuration" NOT NULL DEFAULT E'MANUAL',

    CONSTRAINT "timesheet_break_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_manual_breaks" (
    "id" SERIAL NOT NULL,
    "break_type" TEXT NOT NULL,
    "paid_type" "paid_type_enum" NOT NULL,
    "duration" INTEGER NOT NULL,
    "timesheet_break_settings_id" INTEGER NOT NULL,

    CONSTRAINT "timesheet_manual_breaks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_jobs" (
    "id" SERIAL NOT NULL,
    "job_title" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "job_description" TEXT NOT NULL,
    "all_user" BOOLEAN DEFAULT false,
    "sub_jobs_enabled" BOOLEAN DEFAULT true,
    "status" TEXT DEFAULT E'ACTIVE',
    "timesheets_id" INTEGER NOT NULL,
    "created_by_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timesheet_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_sub_jobs" (
    "id" SERIAL NOT NULL,
    "sub_job_title" TEXT NOT NULL,
    "status" TEXT DEFAULT E'ACTIVE',
    "all_user" BOOLEAN,
    "job_id" INTEGER NOT NULL,
    "created_by_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timesheet_sub_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_geo_location_settings" (
    "id" SERIAL NOT NULL,
    "settings" "geo_location_settings_enum" NOT NULL DEFAULT E'REQUIRED',
    "breadcrumbs_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timesheet_geo_location_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_geo_locations" (
    "id" SERIAL NOT NULL,
    "site_name" TEXT NOT NULL,
    "site_address" TEXT NOT NULL,
    "status" TEXT DEFAULT E'ACTIVE',
    "timesheets_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by_id" INTEGER NOT NULL,

    CONSTRAINT "timesheet_geo_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_reminder_settings" (
    "id" SERIAL NOT NULL,
    "before_start_enabled" BOOLEAN NOT NULL DEFAULT true,
    "before_start" INTEGER NOT NULL DEFAULT 5,
    "after_start_enabled" BOOLEAN NOT NULL DEFAULT true,
    "after_start" INTEGER NOT NULL DEFAULT 5,
    "before_end_enabled" BOOLEAN NOT NULL DEFAULT true,
    "before_end" INTEGER NOT NULL DEFAULT 5,
    "after_end_enabled" BOOLEAN NOT NULL DEFAULT true,
    "after_end" INTEGER NOT NULL DEFAULT 5,
    "no_check_in_enabled" BOOLEAN NOT NULL DEFAULT true,
    "no_check_in_after" INTEGER NOT NULL DEFAULT 5,
    "no_check_out_enabled" BOOLEAN NOT NULL DEFAULT true,
    "no_check_out_after" INTEGER NOT NULL DEFAULT 5,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timesheet_reminder_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_notification_settings" (
    "id" SERIAL NOT NULL,
    "user_request_absence_mobile" BOOLEAN NOT NULL DEFAULT true,
    "user_request_absence_webpush" BOOLEAN NOT NULL DEFAULT true,
    "user_request_absence_email" BOOLEAN NOT NULL DEFAULT true,
    "user_new_shift_added_mobile" BOOLEAN NOT NULL DEFAULT true,
    "user_new_shift_added_webpush" BOOLEAN NOT NULL DEFAULT true,
    "user_new_shift_added_email" BOOLEAN NOT NULL DEFAULT true,
    "user_edit_shift_mobile" BOOLEAN NOT NULL DEFAULT true,
    "user_edit_shift_webpush" BOOLEAN NOT NULL DEFAULT true,
    "user_edit_shift_email" BOOLEAN NOT NULL DEFAULT true,
    "user_exceeds_mobile" BOOLEAN NOT NULL DEFAULT true,
    "user_exceeds_webpush" BOOLEAN NOT NULL DEFAULT true,
    "user_exceeds_email" BOOLEAN NOT NULL DEFAULT true,
    "user_auto_clock_out_mobile" BOOLEAN NOT NULL DEFAULT true,
    "user_auto_clock_out_webpush" BOOLEAN NOT NULL DEFAULT true,
    "user_auto_clock_out_email" BOOLEAN NOT NULL DEFAULT true,
    "user_pending" INTEGER NOT NULL DEFAULT 5,
    "user_pending_mobile" BOOLEAN NOT NULL DEFAULT true,
    "user_pending_webpush" BOOLEAN NOT NULL DEFAULT true,
    "user_pending_email" BOOLEAN NOT NULL DEFAULT true,
    "admin_absence_approval_mobile" BOOLEAN NOT NULL DEFAULT true,
    "admin_absence_approval_webpush" BOOLEAN NOT NULL DEFAULT true,
    "admin_absence_approval_email" BOOLEAN NOT NULL DEFAULT true,
    "admin_shift_approval_mobile" BOOLEAN NOT NULL DEFAULT true,
    "admin_shift_approval_webpush" BOOLEAN NOT NULL DEFAULT true,
    "admin_shift_approval_email" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timesheet_notification_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_off_type" (
    "id" SERIAL NOT NULL,
    "org_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "unit" "time_off_type_units_enum" NOT NULL DEFAULT E'DAYS',
    "paid" BOOLEAN NOT NULL DEFAULT true,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "all_user" BOOLEAN NOT NULL DEFAULT true,
    "status" "time_off_type_status_enum" NOT NULL DEFAULT E'ACTIVE',

    CONSTRAINT "time_off_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_off" (
    "id" SERIAL NOT NULL,
    "time_off_type_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "leave_type_enum" "leave_type_enum" NOT NULL,
    "from_date" DATE NOT NULL,
    "to_date" DATE,
    "from_time" TIMESTAMP(3),
    "to_time" TIMESTAMP(3),
    "reason" TEXT NOT NULL,
    "status" "time_off_status_enum" NOT NULL DEFAULT E'PENDING',
    "timesheet_id" INTEGER NOT NULL,

    CONSTRAINT "time_off_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_taskTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_sub_taskTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_admins" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_timesheet_jobsTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_timesheet_sub_jobsTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_timesheet_geo_locationsTotimesheet_jobs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_time_off_typeTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "repeat_details_task_id_key" ON "repeat_details"("task_id");

-- CreateIndex
CREATE UNIQUE INDEX "timesheets_general_settings_id_key" ON "timesheets"("general_settings_id");

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

-- CreateIndex
CREATE UNIQUE INDEX "timesheets_timesheet_break_settings_id_key" ON "timesheets"("timesheet_break_settings_id");

-- CreateIndex
CREATE UNIQUE INDEX "time_entry_pending_time_entry_id_key" ON "time_entry_pending"("time_entry_id");

-- CreateIndex
CREATE UNIQUE INDEX "workweeks_general_settings_id_key" ON "workweeks"("general_settings_id");

-- CreateIndex
CREATE UNIQUE INDEX "_taskTouser_AB_unique" ON "_taskTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_taskTouser_B_index" ON "_taskTouser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_sub_taskTouser_AB_unique" ON "_sub_taskTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_sub_taskTouser_B_index" ON "_sub_taskTouser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_admins_AB_unique" ON "_admins"("A", "B");

-- CreateIndex
CREATE INDEX "_admins_B_index" ON "_admins"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_timesheet_jobsTouser_AB_unique" ON "_timesheet_jobsTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_timesheet_jobsTouser_B_index" ON "_timesheet_jobsTouser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_timesheet_sub_jobsTouser_AB_unique" ON "_timesheet_sub_jobsTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_timesheet_sub_jobsTouser_B_index" ON "_timesheet_sub_jobsTouser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_timesheet_geo_locationsTotimesheet_jobs_AB_unique" ON "_timesheet_geo_locationsTotimesheet_jobs"("A", "B");

-- CreateIndex
CREATE INDEX "_timesheet_geo_locationsTotimesheet_jobs_B_index" ON "_timesheet_geo_locationsTotimesheet_jobs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_time_off_typeTouser_AB_unique" ON "_time_off_typeTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_time_off_typeTouser_B_index" ON "_time_off_typeTouser"("B");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_board" ADD CONSTRAINT "task_board_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_board_customisation" ADD CONSTRAINT "task_board_customisation_task_board_id_fkey" FOREIGN KEY ("task_board_id") REFERENCES "task_board"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_task_board_id_fkey" FOREIGN KEY ("task_board_id") REFERENCES "task_board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_task" ADD CONSTRAINT "sub_task_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repeat_details" ADD CONSTRAINT "repeat_details_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task_tag" ADD CONSTRAINT "task_tag_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_tag" ADD CONSTRAINT "task_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_comments" ADD CONSTRAINT "task_comments_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_general_settings_id_fkey" FOREIGN KEY ("general_settings_id") REFERENCES "timesheet_general_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_customization_settings_id_fkey" FOREIGN KEY ("customization_settings_id") REFERENCES "timesheet_customization_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_payroll_settings_id_fkey" FOREIGN KEY ("payroll_settings_id") REFERENCES "timesheet_payroll_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_timesheet_break_settings_id_fkey" FOREIGN KEY ("timesheet_break_settings_id") REFERENCES "timesheet_break_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_geo_location_settings_id_fkey" FOREIGN KEY ("geo_location_settings_id") REFERENCES "timesheet_geo_location_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_reminder_settings_id_fkey" FOREIGN KEY ("reminder_settings_id") REFERENCES "timesheet_reminder_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_notification_settings_id_fkey" FOREIGN KEY ("notification_settings_id") REFERENCES "timesheet_notification_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_entry" ADD CONSTRAINT "timesheet_entry_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_entry" ADD CONSTRAINT "timesheet_entry_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_entry" ADD CONSTRAINT "timesheet_entry_timesheet_id_fkey" FOREIGN KEY ("timesheet_id") REFERENCES "timesheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_timesheets_id_fkey" FOREIGN KEY ("timesheets_id") REFERENCES "timesheets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_timesheet_entry_id_fkey" FOREIGN KEY ("timesheet_entry_id") REFERENCES "timesheet_entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_timesheet_jobs_id_fkey" FOREIGN KEY ("timesheet_jobs_id") REFERENCES "timesheet_jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_timesheet_sub_jobs_id_fkey" FOREIGN KEY ("timesheet_sub_jobs_id") REFERENCES "timesheet_sub_jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry_pending" ADD CONSTRAINT "time_entry_pending_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry_pending" ADD CONSTRAINT "time_entry_pending_timesheet_id_fkey" FOREIGN KEY ("timesheet_id") REFERENCES "timesheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry_pending" ADD CONSTRAINT "time_entry_pending_time_entry_id_fkey" FOREIGN KEY ("time_entry_id") REFERENCES "time_entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry_pending" ADD CONSTRAINT "time_entry_pending_timesheet_jobs_id_fkey" FOREIGN KEY ("timesheet_jobs_id") REFERENCES "timesheet_jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry_pending" ADD CONSTRAINT "time_entry_pending_timesheet_sub_jobs_id_fkey" FOREIGN KEY ("timesheet_sub_jobs_id") REFERENCES "timesheet_sub_jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_break" ADD CONSTRAINT "employee_break_timesheet_entry_id_fkey" FOREIGN KEY ("timesheet_entry_id") REFERENCES "timesheet_entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_break" ADD CONSTRAINT "employee_break_timesheet_manual_breaks_id_fkey" FOREIGN KEY ("timesheet_manual_breaks_id") REFERENCES "timesheet_manual_breaks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workweeks" ADD CONSTRAINT "workweeks_general_settings_id_fkey" FOREIGN KEY ("general_settings_id") REFERENCES "timesheet_general_settings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_manual_breaks" ADD CONSTRAINT "timesheet_manual_breaks_timesheet_break_settings_id_fkey" FOREIGN KEY ("timesheet_break_settings_id") REFERENCES "timesheet_break_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_jobs" ADD CONSTRAINT "timesheet_jobs_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_jobs" ADD CONSTRAINT "timesheet_jobs_timesheets_id_fkey" FOREIGN KEY ("timesheets_id") REFERENCES "timesheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_sub_jobs" ADD CONSTRAINT "timesheet_sub_jobs_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_sub_jobs" ADD CONSTRAINT "timesheet_sub_jobs_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "timesheet_jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_geo_locations" ADD CONSTRAINT "timesheet_geo_locations_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_geo_locations" ADD CONSTRAINT "timesheet_geo_locations_timesheets_id_fkey" FOREIGN KEY ("timesheets_id") REFERENCES "timesheets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_off_type" ADD CONSTRAINT "time_off_type_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_off" ADD CONSTRAINT "time_off_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_off" ADD CONSTRAINT "time_off_timesheet_id_fkey" FOREIGN KEY ("timesheet_id") REFERENCES "timesheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_off" ADD CONSTRAINT "time_off_time_off_type_id_fkey" FOREIGN KEY ("time_off_type_id") REFERENCES "time_off_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_taskTouser" ADD FOREIGN KEY ("A") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_taskTouser" ADD FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sub_taskTouser" ADD FOREIGN KEY ("A") REFERENCES "sub_task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sub_taskTouser" ADD FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admins" ADD FOREIGN KEY ("A") REFERENCES "timesheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admins" ADD FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_timesheet_jobsTouser" ADD FOREIGN KEY ("A") REFERENCES "timesheet_jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_timesheet_jobsTouser" ADD FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_timesheet_sub_jobsTouser" ADD FOREIGN KEY ("A") REFERENCES "timesheet_sub_jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_timesheet_sub_jobsTouser" ADD FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_timesheet_geo_locationsTotimesheet_jobs" ADD FOREIGN KEY ("A") REFERENCES "timesheet_geo_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_timesheet_geo_locationsTotimesheet_jobs" ADD FOREIGN KEY ("B") REFERENCES "timesheet_jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_time_off_typeTouser" ADD FOREIGN KEY ("A") REFERENCES "time_off_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_time_off_typeTouser" ADD FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
