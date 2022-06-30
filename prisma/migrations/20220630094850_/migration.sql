/*
  Warnings:

  - Added the required column `created_by_id` to the `time_entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "time_entry" ADD COLUMN     "created_by_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
