/*
  Warnings:

  - The `check_out_time` column on the `time_entry` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `check_in_time` on the `time_entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "time_entry" DROP COLUMN "check_in_time",
ADD COLUMN     "check_in_time" TIMESTAMP(3) NOT NULL,
DROP COLUMN "check_out_time",
ADD COLUMN     "check_out_time" TIMESTAMP(3);
