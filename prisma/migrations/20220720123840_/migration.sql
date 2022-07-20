/*
  Warnings:

  - Added the required column `timesheet_id` to the `employee_break_pending` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee_break_pending" ADD COLUMN     "timesheet_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "employee_break_pending" ADD CONSTRAINT "employee_break_pending_timesheet_id_fkey" FOREIGN KEY ("timesheet_id") REFERENCES "timesheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
