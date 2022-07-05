/*
  Warnings:

  - You are about to drop the column `user_id` on the `time_entry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "time_entry" DROP CONSTRAINT "time_entry_user_id_fkey";

-- AlterTable
ALTER TABLE "time_entry" DROP COLUMN "user_id",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
