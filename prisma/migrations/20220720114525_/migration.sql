-- CreateTable
CREATE TABLE "employee_break_pending" (
    "id" SERIAL NOT NULL,
    "timesheet_manual_breaks_id" INTEGER,
    "duration" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "start_day_type" "DayTypeEnum" NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "end_day_type" "DayTypeEnum" NOT NULL,
    "status" "employee_break_enum",
    "timesheet_entry_id" INTEGER NOT NULL,
    "employee_break_id" INTEGER NOT NULL,

    CONSTRAINT "employee_break_pending_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_break_pending_employee_break_id_key" ON "employee_break_pending"("employee_break_id");

-- AddForeignKey
ALTER TABLE "employee_break_pending" ADD CONSTRAINT "employee_break_pending_timesheet_entry_id_fkey" FOREIGN KEY ("timesheet_entry_id") REFERENCES "timesheet_entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_break_pending" ADD CONSTRAINT "employee_break_pending_employee_break_id_fkey" FOREIGN KEY ("employee_break_id") REFERENCES "employee_break"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_break_pending" ADD CONSTRAINT "employee_break_pending_timesheet_manual_breaks_id_fkey" FOREIGN KEY ("timesheet_manual_breaks_id") REFERENCES "timesheet_manual_breaks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
