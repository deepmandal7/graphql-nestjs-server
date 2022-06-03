-- AlterTable
ALTER TABLE "task" ALTER COLUMN "task_title" DROP NOT NULL,
ALTER COLUMN "task_description" DROP NOT NULL,
ALTER COLUMN "task_location" DROP NOT NULL;
