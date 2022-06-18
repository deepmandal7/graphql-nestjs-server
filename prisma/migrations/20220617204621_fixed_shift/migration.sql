/*
  Warnings:

  - You are about to drop the column `edate` on the `shift` table. All the data in the column will be lost.
  - You are about to drop the column `ehour` on the `shift` table. All the data in the column will be lost.
  - You are about to drop the column `eminute` on the `shift` table. All the data in the column will be lost.
  - You are about to drop the column `emonth` on the `shift` table. All the data in the column will be lost.
  - You are about to drop the column `eyear` on the `shift` table. All the data in the column will be lost.
  - You are about to drop the column `sdate` on the `shift` table. All the data in the column will be lost.
  - You are about to drop the column `shour` on the `shift` table. All the data in the column will be lost.
  - You are about to drop the column `sminute` on the `shift` table. All the data in the column will be lost.
  - You are about to drop the column `smonth` on the `shift` table. All the data in the column will be lost.
  - You are about to drop the column `syear` on the `shift` table. All the data in the column will be lost.
  - You are about to drop the column `clockin_time` on the `time_entry` table. All the data in the column will be lost.
  - You are about to drop the column `clockout_time` on the `time_entry` table. All the data in the column will be lost.
  - You are about to drop the column `shift` on the `time_entry` table. All the data in the column will be lost.
  - Added the required column `end_time` to the `shift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `shift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shift_id` to the `time_entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shift" DROP COLUMN "edate",
DROP COLUMN "ehour",
DROP COLUMN "eminute",
DROP COLUMN "emonth",
DROP COLUMN "eyear",
DROP COLUMN "sdate",
DROP COLUMN "shour",
DROP COLUMN "sminute",
DROP COLUMN "smonth",
DROP COLUMN "syear",
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "time_entry" DROP COLUMN "clockin_time",
DROP COLUMN "clockout_time",
DROP COLUMN "shift",
ADD COLUMN     "shift_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "work_durations" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "time_entry_id" INTEGER NOT NULL,
    "check_in_time" TIMESTAMP(3) NOT NULL,
    "check_out_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_durations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "shift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_durations" ADD CONSTRAINT "work_durations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_durations" ADD CONSTRAINT "work_durations_time_entry_id_fkey" FOREIGN KEY ("time_entry_id") REFERENCES "time_entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
