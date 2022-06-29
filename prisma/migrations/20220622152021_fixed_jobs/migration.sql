/*
  Warnings:

  - You are about to drop the column `site_mapping_enabled` on the `timesheet_jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "timesheet_jobs" DROP COLUMN "site_mapping_enabled";
