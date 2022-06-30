/*
  Warnings:

  - The `status` column on the `timesheet_entry` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "timesheet_entry_status_enum" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "timesheet_entry" DROP COLUMN "status",
ADD COLUMN     "status" "timesheet_entry_status_enum" NOT NULL DEFAULT E'PENDING';
