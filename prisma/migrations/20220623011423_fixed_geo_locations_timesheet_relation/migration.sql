/*
  Warnings:

  - You are about to drop the column `geo_location_settings_id` on the `timesheet_geo_locations` table. All the data in the column will be lost.
  - Added the required column `status` to the `timesheet_geo_locations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "timesheet_geo_locations" DROP CONSTRAINT "timesheet_geo_locations_geo_location_settings_id_fkey";

-- AlterTable
ALTER TABLE "timesheet_geo_locations" DROP COLUMN "geo_location_settings_id",
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "timesheets_id" INTEGER;

-- AddForeignKey
ALTER TABLE "timesheet_geo_locations" ADD CONSTRAINT "timesheet_geo_locations_timesheets_id_fkey" FOREIGN KEY ("timesheets_id") REFERENCES "timesheets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
