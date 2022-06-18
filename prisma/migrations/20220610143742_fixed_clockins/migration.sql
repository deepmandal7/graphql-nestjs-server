/*
  Warnings:

  - You are about to drop the `_clock_insTouser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `clock_ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `timesheets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_clock_insTouser" DROP CONSTRAINT "_clock_insTouser_A_fkey";

-- DropForeignKey
ALTER TABLE "_clock_insTouser" DROP CONSTRAINT "_clock_insTouser_B_fkey";

-- AlterTable
ALTER TABLE "clock_ins" ADD COLUMN     "clock_in_date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "timesheets" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_clock_insTouser";

-- AddForeignKey
ALTER TABLE "clock_ins" ADD CONSTRAINT "clock_ins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
