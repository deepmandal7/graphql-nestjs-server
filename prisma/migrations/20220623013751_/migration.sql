-- AlterTable
ALTER TABLE "timesheet_geo_locations" ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "timesheet_sub_jobs" ALTER COLUMN "all_user" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;
