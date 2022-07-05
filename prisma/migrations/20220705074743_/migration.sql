-- CreateTable
CREATE TABLE "employee_break" (
    "id" SERIAL NOT NULL,
    "break_type" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "timesheet_entry_id" INTEGER NOT NULL,
    "paid" BOOLEAN NOT NULL,

    CONSTRAINT "employee_break_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employee_break" ADD CONSTRAINT "employee_break_timesheet_entry_id_fkey" FOREIGN KEY ("timesheet_entry_id") REFERENCES "timesheet_entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
