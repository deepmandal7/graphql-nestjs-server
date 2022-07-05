/*
  Warnings:

  - You are about to drop the column `total_work_hours` on the `timesheet_entry` table. All the data in the column will be lost.
  - Added the required column `total_work_in_ms` to the `timesheet_entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timesheet_entry" DROP COLUMN "total_work_hours",
ADD COLUMN     "total_work_in_ms" INTEGER NOT NULL;
