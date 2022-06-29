/*
  Warnings:

  - Added the required column `created_by_id` to the `timesheet_sub_jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `timesheet_sub_jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timesheet_sub_jobs" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "timesheet_sub_jobs" ADD CONSTRAINT "timesheet_sub_jobs_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
