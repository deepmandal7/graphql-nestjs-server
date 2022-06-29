/*
  Warnings:

  - A unique constraint covering the columns `[sight_name]` on the table `timesheet_sub_job_settings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "timesheet_sub_job_settings" ADD COLUMN     "sight_name" TEXT;

-- CreateTable
CREATE TABLE "timesheet_geo_location_sub_job_settings" (
    "id" SERIAL NOT NULL,
    "sight_name" TEXT NOT NULL,
    "geo_location_settings_id" INTEGER NOT NULL,

    CONSTRAINT "timesheet_geo_location_sub_job_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "timesheet_sub_job_settings_sight_name_key" ON "timesheet_sub_job_settings"("sight_name");

-- AddForeignKey
ALTER TABLE "timesheet_geo_location_sub_job_settings" ADD CONSTRAINT "timesheet_geo_location_sub_job_settings_sight_name_fkey" FOREIGN KEY ("sight_name") REFERENCES "timesheet_sub_job_settings"("sight_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_geo_location_sub_job_settings" ADD CONSTRAINT "timesheet_geo_location_sub_job_settings_geo_location_setti_fkey" FOREIGN KEY ("geo_location_settings_id") REFERENCES "timesheet_geo_location_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
