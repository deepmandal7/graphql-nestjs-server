/*
  Warnings:

  - You are about to drop the column `admin_id` on the `task_board` table. All the data in the column will be lost.
  - You are about to drop the column `team_users_id` on the `task_board` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task_board" DROP COLUMN "admin_id",
DROP COLUMN "team_users_id",
ADD COLUMN     "admin_ids" INTEGER[],
ADD COLUMN     "team_user_ids" INTEGER[];
