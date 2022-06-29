/*
  Warnings:

  - You are about to drop the `employee_break` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[general_settings_id]` on the table `timesheets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `general_settings_id` to the `timesheets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "working_hours_calculation_enum" AS ENUM ('FIRSTLAST', 'EVERY');

-- CreateEnum
CREATE TYPE "minimum_hours_enum" AS ENUM ('STRICT', 'LENIENT');

-- CreateEnum
CREATE TYPE "manual_or_shift_minimum_hours_enum" AS ENUM ('MANUAL', 'SHIFT');

-- DropForeignKey
ALTER TABLE "employee_break" DROP CONSTRAINT "employee_break_time_entry_id_fkey";

-- DropForeignKey
ALTER TABLE "employee_break" DROP CONSTRAINT "employee_break_user_id_fkey";

-- AlterTable
ALTER TABLE "timesheets" ADD COLUMN     "general_settings_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "employee_break";

-- CreateTable
CREATE TABLE "employee_manual_break" (
    "id" SERIAL NOT NULL,
    "break_type" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "time_entry_id" INTEGER,
    "paid" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "employee_manual_break_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workweeks" (
    "id" SERIAL NOT NULL,
    "general_settings_id" INTEGER,
    "first" BOOLEAN NOT NULL,
    "first_start_time" INTEGER NOT NULL,
    "first_end_time" INTEGER NOT NULL,
    "second" BOOLEAN NOT NULL,
    "second_start_time" INTEGER NOT NULL,
    "second_end_time" INTEGER NOT NULL,
    "third" BOOLEAN NOT NULL,
    "third_start_time" INTEGER NOT NULL,
    "third_end_time" INTEGER NOT NULL,
    "fourth" BOOLEAN NOT NULL,
    "fourth_start_time" INTEGER NOT NULL,
    "fourth_end_time" INTEGER NOT NULL,
    "fifth" BOOLEAN NOT NULL,
    "fifth_start_time" INTEGER NOT NULL,
    "fifth_end_time" INTEGER NOT NULL,
    "saturday" BOOLEAN NOT NULL,
    "saturday_start_time" INTEGER NOT NULL,
    "saturday_end_time" INTEGER NOT NULL,
    "seventh" BOOLEAN NOT NULL,
    "seventh_start_time" INTEGER NOT NULL,
    "seventh_end_time" INTEGER NOT NULL,

    CONSTRAINT "workweeks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "general_settings" (
    "id" SERIAL NOT NULL,
    "workweek_starts_on" INTEGER NOT NULL,
    "working_hours_calculation" "working_hours_calculation_enum" NOT NULL,
    "minimum_hours" "minimum_hours_enum" NOT NULL,
    "manual_or_shift_minimum_hours" "manual_or_shift_minimum_hours_enum" NOT NULL,
    "minimum_hours_manual_full_day" INTEGER NOT NULL,
    "minimum_hours_manual_half_day" INTEGER NOT NULL,
    "restrict_clock_in" BOOLEAN NOT NULL,
    "restrict_clock_in_to" INTEGER NOT NULL,
    "restrict_clock_out" BOOLEAN NOT NULL,
    "restrict_clock_out_to" INTEGER NOT NULL,

    CONSTRAINT "general_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workweeks_general_settings_id_key" ON "workweeks"("general_settings_id");

-- CreateIndex
CREATE UNIQUE INDEX "timesheets_general_settings_id_key" ON "timesheets"("general_settings_id");

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_general_settings_id_fkey" FOREIGN KEY ("general_settings_id") REFERENCES "general_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_manual_break" ADD CONSTRAINT "employee_manual_break_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_manual_break" ADD CONSTRAINT "employee_manual_break_time_entry_id_fkey" FOREIGN KEY ("time_entry_id") REFERENCES "time_entry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workweeks" ADD CONSTRAINT "workweeks_general_settings_id_fkey" FOREIGN KEY ("general_settings_id") REFERENCES "general_settings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
