/*
  Warnings:

  - You are about to drop the column `timesheetsId` on the `time_entry` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `timesheet_entry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "time_entry" DROP CONSTRAINT "time_entry_timesheetsId_fkey";

-- DropForeignKey
ALTER TABLE "timesheet_entry" DROP CONSTRAINT "timesheet_entry_organizationId_fkey";

-- AlterTable
ALTER TABLE "time_entry" DROP COLUMN "timesheetsId",
ADD COLUMN     "timesheets_id" INTEGER,
ALTER COLUMN "check_in_time" SET DATA TYPE TEXT,
ALTER COLUMN "check_out_time" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "timesheet_entry" DROP COLUMN "organizationId",
ADD COLUMN     "organization_id" INTEGER;

-- AddForeignKey
ALTER TABLE "timesheet_entry" ADD CONSTRAINT "timesheet_entry_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_timesheets_id_fkey" FOREIGN KEY ("timesheets_id") REFERENCES "timesheets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
