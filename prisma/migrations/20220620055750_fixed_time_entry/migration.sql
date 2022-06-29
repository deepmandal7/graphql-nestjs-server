/*
  Warnings:

  - You are about to drop the `employee_manual_break` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `job_id` to the `time_entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_job_id` to the `time_entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timesheet_clockin_comments` to the `time_entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timesheet_clockin_time` to the `time_entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timesheet_clockout_time` to the `time_entry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "employee_manual_break" DROP CONSTRAINT "employee_manual_break_time_entry_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_manual_break" DROP CONSTRAINT "employee_manual_break_user_id_fkey";

-- AlterTable
ALTER TABLE "time_entry" ADD COLUMN     "job_id" INTEGER NOT NULL,
ADD COLUMN     "sub_job_id" INTEGER NOT NULL,
ADD COLUMN     "timesheet_clockin_comments" TEXT NOT NULL,
ADD COLUMN     "timesheet_clockin_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "timesheet_clockout_time" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "employee_manual_break";

-- CreateTable
CREATE TABLE "job" (
    "id" SERIAL NOT NULL,
    "job_title" TEXT NOT NULL,

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_job" (
    "id" SERIAL NOT NULL,
    "sub_job_title" TEXT NOT NULL,

    CONSTRAINT "sub_job_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_sub_job_id_fkey" FOREIGN KEY ("sub_job_id") REFERENCES "sub_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
