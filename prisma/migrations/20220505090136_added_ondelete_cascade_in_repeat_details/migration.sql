-- DropForeignKey
ALTER TABLE "repeat_details" DROP CONSTRAINT "repeat_details_task_id_fkey";

-- AddForeignKey
ALTER TABLE "repeat_details" ADD CONSTRAINT "repeat_details_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
