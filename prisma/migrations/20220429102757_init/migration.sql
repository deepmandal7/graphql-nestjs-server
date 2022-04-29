-- CreateTable
CREATE TABLE "job" (
    "id" SERIAL NOT NULL,
    "job_title" TEXT NOT NULL,
    "qualified_users_id" INTEGER[],
    "qualified_groups_id" INTEGER[],
    "subjobs_id" INTEGER[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shift" (
    "id" SERIAL NOT NULL,
    "shift_title" TEXT NOT NULL,
    "shift_date" TIMESTAMP(3) NOT NULL,
    "shift_start_time" TEXT NOT NULL,
    "shift_end_time" TEXT NOT NULL,
    "shift_timezone" TEXT NOT NULL,
    "shift_job_id" INTEGER NOT NULL,
    "spots_to_claim" INTEGER NOT NULL,
    "users_id" INTEGER[],
    "shift_tasks_id" INTEGER[],
    "repeat_details" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shift_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_job_title_key" ON "job"("job_title");

-- CreateIndex
CREATE UNIQUE INDEX "shift_shift_title_key" ON "shift"("shift_title");

-- AddForeignKey
ALTER TABLE "shift" ADD CONSTRAINT "shift_shift_job_id_fkey" FOREIGN KEY ("shift_job_id") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
