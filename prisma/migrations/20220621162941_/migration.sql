/*
  Warnings:

  - The `payroll_export_time_format` column on the `timesheet_general_settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "payroll_export_time_format_enum" AS ENUM ('DECIMAL', 'MINUTES');

-- AlterTable
ALTER TABLE "timesheet_general_settings" DROP COLUMN "payroll_export_time_format",
ADD COLUMN     "payroll_export_time_format" "payroll_export_time_format_enum" NOT NULL DEFAULT E'MINUTES';
