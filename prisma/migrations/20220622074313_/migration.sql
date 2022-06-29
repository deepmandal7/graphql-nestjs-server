-- AlterTable
ALTER TABLE "timesheet_jobs" ALTER COLUMN "sub_jobs_enabled" DROP NOT NULL,
ALTER COLUMN "site_mapping_enabled" DROP NOT NULL;
