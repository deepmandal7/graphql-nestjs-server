/*
  Warnings:

  - Added the required column `clock_in_local_date_time` to the `clock_ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clock_ins" ADD COLUMN     "clock_in_local_date_time" TEXT NOT NULL;
