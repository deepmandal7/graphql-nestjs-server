-- DropForeignKey
ALTER TABLE "time_entry" DROP CONSTRAINT "time_entry_job_id_fkey";

-- DropForeignKey
ALTER TABLE "time_entry" DROP CONSTRAINT "time_entry_sub_job_id_fkey";

-- AlterTable
ALTER TABLE "time_entry" ALTER COLUMN "notes" DROP NOT NULL,
ALTER COLUMN "job_id" DROP NOT NULL,
ALTER COLUMN "sub_job_id" DROP NOT NULL,
ALTER COLUMN "timesheet_clockin_comments" DROP NOT NULL,
ALTER COLUMN "timesheet_clockin_time" DROP NOT NULL,
ALTER COLUMN "timesheet_clockout_time" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_sub_job_id_fkey" FOREIGN KEY ("sub_job_id") REFERENCES "sub_job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
