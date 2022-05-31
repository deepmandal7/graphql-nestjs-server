-- AlterTable
ALTER TABLE "sub_task" ADD COLUMN     "task_status" TEXT NOT NULL DEFAULT E'Scheduled';

-- AlterTable
ALTER TABLE "task" ALTER COLUMN "task_status" SET DEFAULT E'Scheduled';
