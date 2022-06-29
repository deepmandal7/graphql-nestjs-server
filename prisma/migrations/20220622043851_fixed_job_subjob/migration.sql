/*
  Warnings:

  - You are about to drop the column `sight_name` on the `timesheet_sub_job_settings` table. All the data in the column will be lost.
  - You are about to drop the `timesheet_geo_location_sub_job_settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "timesheet_geo_location_sub_job_settings" DROP CONSTRAINT "timesheet_geo_location_sub_job_settings_geo_location_setti_fkey";

-- DropForeignKey
ALTER TABLE "timesheet_geo_location_sub_job_settings" DROP CONSTRAINT "timesheet_geo_location_sub_job_settings_sight_name_fkey";

-- DropIndex
DROP INDEX "timesheet_sub_job_settings_sight_name_key";

-- AlterTable
ALTER TABLE "timesheet_sub_job_settings" DROP COLUMN "sight_name";

-- DropTable
DROP TABLE "timesheet_geo_location_sub_job_settings";
