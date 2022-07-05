/*
  Warnings:

  - You are about to drop the column `check_out_date_type` on the `time_entry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "time_entry" DROP COLUMN "check_out_date_type",
ADD COLUMN     "check_out_day_type" "DayTypeEnum";
