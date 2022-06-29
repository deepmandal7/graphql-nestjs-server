/*
  Warnings:

  - You are about to drop the column `organization_id` on the `timesheet_entry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "timesheet_entry" DROP CONSTRAINT "timesheet_entry_organization_id_fkey";

-- AlterTable
ALTER TABLE "timesheet_entry" DROP COLUMN "organization_id";
