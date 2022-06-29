/*
  Warnings:

  - You are about to drop the `timesheet_geo_location_job_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `timesheet_job_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `timesheet_sub_job_settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "timesheet_geo_location_job_settings" DROP CONSTRAINT "timesheet_geo_location_job_settings_geo_location_settings__fkey";

-- DropForeignKey
ALTER TABLE "timesheet_geo_location_job_settings" DROP CONSTRAINT "timesheet_geo_location_job_settings_sight_name_fkey";

-- DropForeignKey
ALTER TABLE "timesheet_job_settings" DROP CONSTRAINT "timesheet_job_settings_timesheets_id_fkey";

-- DropForeignKey
ALTER TABLE "timesheet_sub_job_settings" DROP CONSTRAINT "timesheet_sub_job_settings_job_settings_id_fkey";

-- DropTable
DROP TABLE "timesheet_geo_location_job_settings";

-- DropTable
DROP TABLE "timesheet_job_settings";

-- DropTable
DROP TABLE "timesheet_sub_job_settings";

-- CreateTable
CREATE TABLE "timesheet_jobs" (
    "id" SERIAL NOT NULL,
    "job_title" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "job_description" TEXT NOT NULL,
    "all_user" BOOLEAN NOT NULL,
    "sub_jobs_enabled" BOOLEAN NOT NULL,
    "site_mapping_enabled" BOOLEAN NOT NULL,
    "timesheets_id" INTEGER NOT NULL,

    CONSTRAINT "timesheet_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_sub_jobs" (
    "id" SERIAL NOT NULL,
    "sub_job_title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "all_user" BOOLEAN NOT NULL,
    "job_id" INTEGER NOT NULL,

    CONSTRAINT "timesheet_sub_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timesheet_geo_locations" (
    "id" SERIAL NOT NULL,
    "sight_name" TEXT NOT NULL,
    "sight_adress" TEXT NOT NULL,
    "geo_location_settings_id" INTEGER NOT NULL,

    CONSTRAINT "timesheet_geo_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_timesheet_jobsTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_timesheet_sub_jobsTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_timesheet_geo_locationsTotimesheet_jobs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "timesheet_sub_jobs_job_id_key" ON "timesheet_sub_jobs"("job_id");

-- CreateIndex
CREATE UNIQUE INDEX "_timesheet_jobsTouser_AB_unique" ON "_timesheet_jobsTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_timesheet_jobsTouser_B_index" ON "_timesheet_jobsTouser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_timesheet_sub_jobsTouser_AB_unique" ON "_timesheet_sub_jobsTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_timesheet_sub_jobsTouser_B_index" ON "_timesheet_sub_jobsTouser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_timesheet_geo_locationsTotimesheet_jobs_AB_unique" ON "_timesheet_geo_locationsTotimesheet_jobs"("A", "B");

-- CreateIndex
CREATE INDEX "_timesheet_geo_locationsTotimesheet_jobs_B_index" ON "_timesheet_geo_locationsTotimesheet_jobs"("B");

-- AddForeignKey
ALTER TABLE "timesheet_jobs" ADD CONSTRAINT "timesheet_jobs_timesheets_id_fkey" FOREIGN KEY ("timesheets_id") REFERENCES "timesheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_sub_jobs" ADD CONSTRAINT "timesheet_sub_jobs_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "timesheet_jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheet_geo_locations" ADD CONSTRAINT "timesheet_geo_locations_geo_location_settings_id_fkey" FOREIGN KEY ("geo_location_settings_id") REFERENCES "timesheet_geo_location_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_timesheet_jobsTouser" ADD FOREIGN KEY ("A") REFERENCES "timesheet_jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_timesheet_jobsTouser" ADD FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_timesheet_sub_jobsTouser" ADD FOREIGN KEY ("A") REFERENCES "timesheet_sub_jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_timesheet_sub_jobsTouser" ADD FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_timesheet_geo_locationsTotimesheet_jobs" ADD FOREIGN KEY ("A") REFERENCES "timesheet_geo_locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_timesheet_geo_locationsTotimesheet_jobs" ADD FOREIGN KEY ("B") REFERENCES "timesheet_jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
