/*
  Warnings:

  - You are about to drop the column `admin_ids` on the `task_board` table. All the data in the column will be lost.
  - You are about to drop the column `team_user_ids` on the `task_board` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task_board" DROP COLUMN "admin_ids",
DROP COLUMN "team_user_ids";
