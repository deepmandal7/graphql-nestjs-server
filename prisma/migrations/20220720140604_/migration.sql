-- CreateTable
CREATE TABLE "shift" (
    "id" SERIAL NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "timesheet_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "timesheet_jobs_id" INTEGER,
    "timesheet_sub_jobs_id" INTEGER,
    "created_by_id" INTEGER NOT NULL,

    CONSTRAINT "shift_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shift" ADD CONSTRAINT "shift_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift" ADD CONSTRAINT "shift_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift" ADD CONSTRAINT "shift_timesheet_id_fkey" FOREIGN KEY ("timesheet_id") REFERENCES "timesheets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift" ADD CONSTRAINT "shift_timesheet_jobs_id_fkey" FOREIGN KEY ("timesheet_jobs_id") REFERENCES "timesheet_jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift" ADD CONSTRAINT "shift_timesheet_sub_jobs_id_fkey" FOREIGN KEY ("timesheet_sub_jobs_id") REFERENCES "timesheet_sub_jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
