/*
  Warnings:

  - The values [mondayLAST] on the enum `working_hours_calculation_enum` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `payroll_export_time_format` to the `general_settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezone` to the `general_settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "working_hours_calculation_enum_new" AS ENUM ('FIRSTLAST', 'EVERY');
ALTER TABLE "general_settings" ALTER COLUMN "working_hours_calculation" TYPE "working_hours_calculation_enum_new" USING ("working_hours_calculation"::text::"working_hours_calculation_enum_new");
ALTER TYPE "working_hours_calculation_enum" RENAME TO "working_hours_calculation_enum_old";
ALTER TYPE "working_hours_calculation_enum_new" RENAME TO "working_hours_calculation_enum";
DROP TYPE "working_hours_calculation_enum_old";
COMMIT;

-- AlterTable
ALTER TABLE "general_settings" ADD COLUMN     "payroll_export_time_format" TEXT NOT NULL,
ADD COLUMN     "timezone" TEXT NOT NULL;
