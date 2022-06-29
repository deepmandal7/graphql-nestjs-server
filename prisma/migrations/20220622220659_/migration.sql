/*
  Warnings:

  - You are about to drop the column `sight_adress` on the `timesheet_geo_locations` table. All the data in the column will be lost.
  - Added the required column `sight_address` to the `timesheet_geo_locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timesheet_geo_locations" DROP COLUMN "sight_adress",
ADD COLUMN     "sight_address" TEXT NOT NULL;
