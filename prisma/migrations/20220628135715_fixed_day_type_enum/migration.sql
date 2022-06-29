/*
  Warnings:

  - The `check_out_date_type` column on the `time_entry` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `check_in_day_type` on the `time_entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DayTypeEnum" AS ENUM ('NEXT', 'PREVIOUS', 'CURRENT');

-- AlterTable
ALTER TABLE "time_entry" DROP COLUMN "check_in_day_type",
ADD COLUMN     "check_in_day_type" "DayTypeEnum" NOT NULL,
DROP COLUMN "check_out_date_type",
ADD COLUMN     "check_out_date_type" "DayTypeEnum";
