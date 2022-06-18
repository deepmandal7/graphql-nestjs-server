/*
  Warnings:

  - Added the required column `user_id` to the `employee_break` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee_break" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "time_entry" ALTER COLUMN "status" SET DEFAULT E'Pending';

-- AddForeignKey
ALTER TABLE "employee_break" ADD CONSTRAINT "employee_break_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
