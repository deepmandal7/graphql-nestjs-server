/*
  Warnings:

  - You are about to drop the `clock_in_outs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `leave` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "clock_in_outs" DROP CONSTRAINT "clock_in_outs_timesheet_id_fkey";

-- DropForeignKey
ALTER TABLE "clock_in_outs" DROP CONSTRAINT "clock_in_outs_user_id_fkey";

-- DropTable
DROP TABLE "clock_in_outs";

-- DropTable
DROP TABLE "leave";

-- CreateTable
CREATE TABLE "time_entry" (
    "id" SERIAL NOT NULL,
    "timesheet_id" INTEGER NOT NULL,
    "shift" INTEGER NOT NULL,
    "clockin_time" TIMESTAMP(3) NOT NULL,
    "clockout_time" TIMESTAMP(3) NOT NULL,
    "org" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time_entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_break" (
    "id" SERIAL NOT NULL,
    "break_type" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "time_entry_id" INTEGER,

    CONSTRAINT "employee_break_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_timesheet_id_fkey" FOREIGN KEY ("timesheet_id") REFERENCES "timesheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_break" ADD CONSTRAINT "employee_break_time_entry_id_fkey" FOREIGN KEY ("time_entry_id") REFERENCES "time_entry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
