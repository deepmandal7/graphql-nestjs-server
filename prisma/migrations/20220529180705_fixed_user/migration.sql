/*
  Warnings:

  - Changed the type of `org_id` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "task_boardId" INTEGER,
DROP COLUMN "org_id",
ADD COLUMN     "org_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_task_boardId_fkey" FOREIGN KEY ("task_boardId") REFERENCES "task_board"("id") ON DELETE SET NULL ON UPDATE CASCADE;
