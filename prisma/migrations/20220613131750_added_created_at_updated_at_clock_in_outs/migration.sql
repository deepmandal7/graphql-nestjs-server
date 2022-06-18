/*
  Warnings:

  - Added the required column `updated_at` to the `clock_in_outs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clock_in_outs" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
