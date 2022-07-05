/*
  Warnings:

  - You are about to drop the column `break_type` on the `employee_break` table. All the data in the column will be lost.
  - You are about to drop the column `paid` on the `employee_break` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[timesheet_manual_breaks_id]` on the table `employee_break` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[timesheet_break_settings_id]` on the table `timesheets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `timesheet_break_settings_id` to the `timesheets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "break_configuration" AS ENUM ('MANUAL', 'AUTOMATIC');

-- CreateEnum
CREATE TYPE "paid_type_enum" AS ENUM ('PAID', 'UNPAID');

-- AlterTable
ALTER TABLE "employee_break" DROP COLUMN "break_type",
DROP COLUMN "paid",
ADD COLUMN     "timesheet_manual_breaks_id" INTEGER;

-- AlterTable
ALTER TABLE "timesheets" ADD COLUMN     "timesheet_break_settings_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "timesheet_break_settings" (
    "id" SERIAL NOT NULL,
    "is_enabled" BOOLEAN NOT NULL,
    "break_configuration" "break_configuration" NOT NULL,

    CONSTRAINT "timesheet_break_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_manual_breaks" (
    "id" SERIAL NOT NULL,
    "break_type" TEXT NOT NULL,
    "paid_type" "paid_type_enum" NOT NULL,
    "duration" INTEGER NOT NULL,
    "timesheet_break_settings_id" INTEGER,

    CONSTRAINT "timesheet_manual_breaks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "timesheet_manual_breaks_timesheet_break_settings_id_key" ON "timesheet_manual_breaks"("timesheet_break_settings_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_break_timesheet_manual_breaks_id_key" ON "employee_break"("timesheet_manual_breaks_id");

-- CreateIndex
CREATE UNIQUE INDEX "timesheets_timesheet_break_settings_id_key" ON "timesheets"("timesheet_break_settings_id");

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_timesheet_break_settings_id_fkey" FOREIGN KEY ("timesheet_break_settings_id") REFERENCES "timesheet_break_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_break" ADD CONSTRAINT "employee_break_timesheet_manual_breaks_id_fkey" FOREIGN KEY ("timesheet_manual_breaks_id") REFERENCES "timesheet_manual_breaks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_manual_breaks" ADD CONSTRAINT "timesheet_manual_breaks_timesheet_break_settings_id_fkey" FOREIGN KEY ("timesheet_break_settings_id") REFERENCES "timesheet_break_settings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
