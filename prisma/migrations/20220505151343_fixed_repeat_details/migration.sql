/*
  Warnings:

  - You are about to drop the column `interval` on the `repeat_details` table. All the data in the column will be lost.
  - You are about to drop the column `yearly` on the `repeat_details` table. All the data in the column will be lost.
  - Added the required column `month_of_year` to the `repeat_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repeat_week_type` to the `repeat_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "repeat_details" DROP COLUMN "interval",
DROP COLUMN "yearly",
ADD COLUMN     "month_of_year" INTEGER NOT NULL,
ADD COLUMN     "repeat_week_type" INTEGER NOT NULL;
