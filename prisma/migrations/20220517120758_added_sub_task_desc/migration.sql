/*
  Warnings:

  - Added the required column `task_description` to the `sub_task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sub_task" ADD COLUMN     "task_description" TEXT NOT NULL;
