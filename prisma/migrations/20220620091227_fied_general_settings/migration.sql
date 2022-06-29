-- AlterTable
ALTER TABLE "general_settings" ALTER COLUMN "minimum_hours" SET DEFAULT E'STRICT',
ALTER COLUMN "manual_or_shift_minimum_hours" SET DEFAULT E'MANUAL',
ALTER COLUMN "minimum_hours_manual_full_day" SET DEFAULT E'08:00',
ALTER COLUMN "minimum_hours_manual_full_day" SET DATA TYPE TEXT,
ALTER COLUMN "minimum_hours_manual_half_day" SET DEFAULT E'04:00',
ALTER COLUMN "minimum_hours_manual_half_day" SET DATA TYPE TEXT,
ALTER COLUMN "restrict_clock_in" SET DEFAULT false,
ALTER COLUMN "restrict_clock_in_to" SET DEFAULT 5,
ALTER COLUMN "restrict_clock_out" SET DEFAULT false,
ALTER COLUMN "restrict_clock_out_to" SET DEFAULT 5,
ALTER COLUMN "payroll_export_time_format" SET DEFAULT E'MM/DD/YYYY',
ALTER COLUMN "timezone" SET DEFAULT E'Asia/Kolkata';
