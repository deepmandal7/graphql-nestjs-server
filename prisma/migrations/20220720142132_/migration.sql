/*
  Warnings:

  - Added the required column `status` to the `shift` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "shift_status_enum" AS ENUM ('DELETED');

-- AlterTable
ALTER TABLE "shift" ADD COLUMN     "status" "shift_status_enum" NOT NULL;
