/*
  Warnings:

  - You are about to drop the `clock_ins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "clock_ins" DROP CONSTRAINT "clock_ins_timesheet_id_fkey";

-- DropForeignKey
ALTER TABLE "clock_ins" DROP CONSTRAINT "clock_ins_user_id_fkey";

-- DropTable
DROP TABLE "clock_ins";

-- CreateTable
CREATE TABLE "clock_in_outs" (
    "id" SERIAL NOT NULL,
    "timesheet_id" INTEGER NOT NULL,
    "syear" INTEGER,
    "smonth" INTEGER,
    "sdate" INTEGER,
    "shour" INTEGER,
    "sminute" INTEGER,
    "eyear" INTEGER,
    "emonth" INTEGER,
    "edate" INTEGER,
    "ehour" INTEGER,
    "eminute" INTEGER,
    "clock_in_local_date_time" TEXT NOT NULL,
    "clock_out_local_date_time" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "clock_in_outs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clock_in_outs" ADD CONSTRAINT "clock_in_outs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clock_in_outs" ADD CONSTRAINT "clock_in_outs_timesheet_id_fkey" FOREIGN KEY ("timesheet_id") REFERENCES "timesheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
