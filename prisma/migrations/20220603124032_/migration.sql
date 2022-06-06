/*
  Warnings:

  - You are about to drop the column `created_by` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "created_by",
ADD COLUMN     "created_by_id" INTEGER;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
