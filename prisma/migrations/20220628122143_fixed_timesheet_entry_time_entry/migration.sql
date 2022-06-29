/*
  Warnings:

  - You are about to drop the column `created_at` on the `time_entry` table. All the data in the column will be lost.
  - You are about to drop the column `created_by_id` on the `time_entry` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `time_entry` table. All the data in the column will be lost.
  - You are about to drop the column `org_id` on the `time_entry` table. All the data in the column will be lost.
  - You are about to drop the column `shift_id` on the `time_entry` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `time_entry` table. All the data in the column will be lost.
  - You are about to drop the column `sub_job_id` on the `time_entry` table. All the data in the column will be lost.
  - You are about to drop the column `timesheet_clockin_comments` on the `time_entry` table. All the data in the column will be lost.
  - You are about to drop the column `timesheet_clockin_time` on the `time_entry` table. All the data in the column will be lost.
  - You are about to drop the column `timesheet_clockout_time` on the `time_entry` table. All the data in the column will be lost.
  - You are about to drop the column `timesheet_id` on the `time_entry` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `time_entry` table. All the data in the column will be lost.
  - You are about to drop the `shift` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `work_durations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `check_in_day_type` to the `time_entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `check_in_time` to the `time_entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timesheet_entry_id` to the `time_entry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "shift" DROP CONSTRAINT "shift_org_id_fkey";

-- DropForeignKey
ALTER TABLE "time_entry" DROP CONSTRAINT "time_entry_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "time_entry" DROP CONSTRAINT "time_entry_org_id_fkey";

-- DropForeignKey
ALTER TABLE "time_entry" DROP CONSTRAINT "time_entry_shift_id_fkey";

-- DropForeignKey
ALTER TABLE "time_entry" DROP CONSTRAINT "time_entry_timesheet_id_fkey";

-- DropForeignKey
ALTER TABLE "work_durations" DROP CONSTRAINT "work_durations_time_entry_id_fkey";

-- DropForeignKey
ALTER TABLE "work_durations" DROP CONSTRAINT "work_durations_user_id_fkey";

-- AlterTable
ALTER TABLE "time_entry" DROP COLUMN "created_at",
DROP COLUMN "created_by_id",
DROP COLUMN "notes",
DROP COLUMN "org_id",
DROP COLUMN "shift_id",
DROP COLUMN "status",
DROP COLUMN "sub_job_id",
DROP COLUMN "timesheet_clockin_comments",
DROP COLUMN "timesheet_clockin_time",
DROP COLUMN "timesheet_clockout_time",
DROP COLUMN "timesheet_id",
DROP COLUMN "updated_at",
ADD COLUMN     "check_in_day_type" TEXT NOT NULL,
ADD COLUMN     "check_in_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "check_out_date_type" TEXT,
ADD COLUMN     "check_out_time" TIMESTAMP(3),
ADD COLUMN     "timesheet_entry_id" INTEGER NOT NULL,
ADD COLUMN     "timesheet_jobs_id" INTEGER,
ADD COLUMN     "timesheet_sub_jobs_id" INTEGER,
ADD COLUMN     "timesheetsId" INTEGER;

-- DropTable
DROP TABLE "shift";

-- DropTable
DROP TABLE "work_durations";

-- DropEnum
DROP TYPE "punch_type_enum";

-- CreateTable
CREATE TABLE "timesheet_entry" (
    "id" SERIAL NOT NULL,
    "timesheet_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT E'Pending',
    "user_id" INTEGER NOT NULL,
    "entry_date" TIMESTAMP(3) NOT NULL,
    "timesheet_clockin_time" TIMESTAMP(3),
    "timesheet_clockout_time" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by_id" INTEGER NOT NULL,
    "organizationId" INTEGER,

    CONSTRAINT "timesheet_entry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "timesheet_entry" ADD CONSTRAINT "timesheet_entry_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_entry" ADD CONSTRAINT "timesheet_entry_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_entry" ADD CONSTRAINT "timesheet_entry_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_entry" ADD CONSTRAINT "timesheet_entry_timesheet_id_fkey" FOREIGN KEY ("timesheet_id") REFERENCES "timesheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_timesheetsId_fkey" FOREIGN KEY ("timesheetsId") REFERENCES "timesheets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_timesheet_entry_id_fkey" FOREIGN KEY ("timesheet_entry_id") REFERENCES "timesheet_entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_timesheet_jobs_id_fkey" FOREIGN KEY ("timesheet_jobs_id") REFERENCES "timesheet_jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_timesheet_sub_jobs_id_fkey" FOREIGN KEY ("timesheet_sub_jobs_id") REFERENCES "timesheet_sub_jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
