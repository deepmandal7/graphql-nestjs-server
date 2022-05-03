-- CreateEnum
CREATE TYPE "task_frequency" AS ENUM ('ONEOFF', 'RECURRING');

-- CreateTable
CREATE TABLE "task_board" (
    "id" SERIAL NOT NULL,
    "task_board_name" TEXT NOT NULL,
    "team_users_id" INTEGER[],
    "admin_id" INTEGER[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER NOT NULL,

    CONSTRAINT "task_board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "task_title" TEXT NOT NULL,
    "task_description" TEXT NOT NULL,
    "task_file_id" TEXT[],
    "task_frequency" "task_frequency" NOT NULL,
    "task_start_utc_date_time" TIMESTAMP(3) NOT NULL,
    "task_end_utc_date_time" TIMESTAMP(3) NOT NULL,
    "task_timezone" TEXT NOT NULL,
    "task_coordinates" DOUBLE PRECISION[],
    "task_location" TEXT NOT NULL,
    "task_board_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_task" (
    "id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "due_utc_date_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER NOT NULL,

    CONSTRAINT "sub_task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "task_board_task_board_name_key" ON "task_board"("task_board_name");

-- CreateIndex
CREATE UNIQUE INDEX "task_task_title_key" ON "task"("task_title");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_task_board_id_fkey" FOREIGN KEY ("task_board_id") REFERENCES "task_board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_task" ADD CONSTRAINT "sub_task_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
