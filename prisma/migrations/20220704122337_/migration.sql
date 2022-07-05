/*
  Warnings:

  - You are about to drop the column `userId` on the `time_entry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "time_entry" DROP CONSTRAINT "time_entry_userId_fkey";

-- AlterTable
ALTER TABLE "time_entry" DROP COLUMN "userId";
