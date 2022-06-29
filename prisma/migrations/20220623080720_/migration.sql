/*
  Warnings:

  - You are about to drop the column `sight_address` on the `timesheet_geo_locations` table. All the data in the column will be lost.
  - You are about to drop the column `sight_name` on the `timesheet_geo_locations` table. All the data in the column will be lost.
  - Added the required column `site_address` to the `timesheet_geo_locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `site_name` to the `timesheet_geo_locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timesheet_geo_locations" DROP COLUMN "sight_address",
DROP COLUMN "sight_name",
ADD COLUMN     "site_address" TEXT NOT NULL,
ADD COLUMN     "site_name" TEXT NOT NULL;
