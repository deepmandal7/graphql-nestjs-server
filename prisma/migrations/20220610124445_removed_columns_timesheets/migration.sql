/*
  Warnings:

  - You are about to drop the column `locale` on the `timesheets` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `timesheets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "timesheets" DROP COLUMN "locale",
DROP COLUMN "timezone";
