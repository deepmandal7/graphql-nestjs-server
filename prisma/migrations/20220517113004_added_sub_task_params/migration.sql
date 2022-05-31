/*
  Warnings:

  - Added the required column `sdate` to the `sub_task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shour` to the `sub_task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sminute` to the `sub_task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smonth` to the `sub_task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `syear` to the `sub_task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sub_task" ADD COLUMN     "sdate" INTEGER NOT NULL,
ADD COLUMN     "shour" INTEGER NOT NULL,
ADD COLUMN     "sminute" INTEGER NOT NULL,
ADD COLUMN     "smonth" INTEGER NOT NULL,
ADD COLUMN     "sub_task_end_date_time" TEXT,
ADD COLUMN     "sub_task_start_date_time" TEXT,
ADD COLUMN     "syear" INTEGER NOT NULL;
