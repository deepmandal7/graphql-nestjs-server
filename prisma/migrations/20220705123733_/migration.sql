/*
  Warnings:

  - Added the required column `end_day_type` to the `employee_break` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_day_type` to the `employee_break` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `employee_break` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "employee_break_enum" AS ENUM ('DELETED');

-- AlterTable
ALTER TABLE "employee_break" ADD COLUMN     "end_day_type" "DayTypeEnum" NOT NULL,
ADD COLUMN     "start_day_type" "DayTypeEnum" NOT NULL,
ADD COLUMN     "status" "employee_break_enum" NOT NULL;
