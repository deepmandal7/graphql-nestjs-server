/*
  Warnings:

  - You are about to drop the column `day_of_weak` on the `repeat_details` table. All the data in the column will be lost.
  - You are about to drop the column `repeat_week_type` on the `repeat_details` table. All the data in the column will be lost.
  - Added the required column `week_of_month` to the `repeat_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "repeat_details" DROP COLUMN "day_of_weak",
DROP COLUMN "repeat_week_type",
ADD COLUMN     "day_of_week" INTEGER[],
ADD COLUMN     "week_of_month" INTEGER NOT NULL;
