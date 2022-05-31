/*
  Warnings:

  - You are about to drop the column `task_boardId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_task_boardId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "task_boardId";
