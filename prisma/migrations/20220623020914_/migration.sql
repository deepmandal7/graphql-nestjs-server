-- AlterTable
ALTER TABLE "timesheet_geo_locations" ALTER COLUMN "status" SET DEFAULT E'ACTIVE';

-- AlterTable
ALTER TABLE "timesheet_jobs" ALTER COLUMN "status" SET DEFAULT E'ACTIVE';

-- AlterTable
ALTER TABLE "timesheet_sub_jobs" ALTER COLUMN "status" SET DEFAULT E'ACTIVE';
