/*
  Warnings:

  - Added the required column `updated_at` to the `timesheet_customization_settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `timesheet_general_settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `timesheet_jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `timesheet_jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `timesheet_payroll_settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `workweeks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timesheet_customization_settings" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "timesheet_general_settings" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "timesheet_jobs" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "timesheet_payroll_settings" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "workweeks" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "timesheet_jobs" ADD CONSTRAINT "timesheet_jobs_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
