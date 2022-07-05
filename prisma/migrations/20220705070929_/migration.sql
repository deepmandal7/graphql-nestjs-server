/*
  Warnings:

  - Added the required column `status` to the `time_entry` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "time_entry_status_enum" AS ENUM ('DELETED');

-- AlterTable
ALTER TABLE "time_entry" ADD COLUMN     "status" "time_entry_status_enum" NOT NULL;
