/*
  Warnings:

  - You are about to drop the column `timeclock_id` on the `clock_ins` table. All the data in the column will be lost.
  - You are about to drop the `timeclock` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `timesheet_id` to the `clock_ins` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_admin_ids" DROP CONSTRAINT "_admin_ids_A_fkey";

-- DropForeignKey
ALTER TABLE "_user_ids" DROP CONSTRAINT "_user_ids_A_fkey";

-- DropForeignKey
ALTER TABLE "clock_ins" DROP CONSTRAINT "clock_ins_timeclock_id_fkey";

-- AlterTable
ALTER TABLE "clock_ins" DROP COLUMN "timeclock_id",
ADD COLUMN     "timesheet_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "timeclock";

-- CreateTable
CREATE TABLE "timesheets" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "assign_to_all" BOOLEAN,
    "group_ids" INTEGER[],
    "locale" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "org_id" INTEGER NOT NULL,
    "created_by" INTEGER NOT NULL,

    CONSTRAINT "timesheets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clock_ins" ADD CONSTRAINT "clock_ins_timesheet_id_fkey" FOREIGN KEY ("timesheet_id") REFERENCES "timesheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_ids" ADD FOREIGN KEY ("A") REFERENCES "timesheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin_ids" ADD FOREIGN KEY ("A") REFERENCES "timesheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
