/*
  Warnings:

  - You are about to drop the column `daily` on the `repeat_details` table. All the data in the column will be lost.
  - You are about to drop the column `monthly` on the `repeat_details` table. All the data in the column will be lost.
  - You are about to drop the column `weekly` on the `repeat_details` table. All the data in the column will be lost.
  - Added the required column `day_of_month` to the `repeat_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `how_often_repeat` to the `repeat_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recurring_type` to the `repeat_details` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "recurring_type_enum" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- AlterTable
ALTER TABLE "repeat_details" DROP COLUMN "daily",
DROP COLUMN "monthly",
DROP COLUMN "weekly",
ADD COLUMN     "day_of_month" INTEGER NOT NULL,
ADD COLUMN     "day_of_weak" INTEGER[],
ADD COLUMN     "how_often_repeat" INTEGER NOT NULL,
ADD COLUMN     "recurring_type" "recurring_type_enum" NOT NULL;
