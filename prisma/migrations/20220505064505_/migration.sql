-- CreateEnum
CREATE TYPE "can_create_enum" AS ENUM ('EVERYONE', 'ADMIN');

-- CreateEnum
CREATE TYPE "task_frequency_enum" AS ENUM ('ONEOFF', 'RECURRING');

-- CreateTable
CREATE TABLE "task_board" (
    "id" SERIAL NOT NULL,
    "task_board_name" TEXT NOT NULL,
    "can_create" "can_create_enum" NOT NULL,
    "tags" JSONB,
    "customisation" JSONB NOT NULL,
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
    "task_frequency" "task_frequency_enum" NOT NULL,
    "task_start_utc_date_time" TIMESTAMP(3) NOT NULL,
    "task_end_utc_date_time" TIMESTAMP(3) NOT NULL,
    "task_coordinates" DOUBLE PRECISION[],
    "task_location" TEXT NOT NULL,
    "task_board_id" INTEGER NOT NULL,
    "task_status" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "repeat_details" (
    "id" SERIAL NOT NULL,
    "interval" INTEGER NOT NULL,
    "stop_repeat" TIMESTAMP(3) NOT NULL,
    "task_id" INTEGER NOT NULL,
    "daily" BOOLEAN,
    "weekly" JSONB,
    "monthly" JSONB,
    "yearly" JSONB,

    CONSTRAINT "repeat_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "task_board_task_board_name_key" ON "task_board"("task_board_name");

-- CreateIndex
CREATE UNIQUE INDEX "task_task_title_key" ON "task"("task_title");

-- CreateIndex
CREATE UNIQUE INDEX "repeat_details_task_id_key" ON "repeat_details"("task_id");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_task_board_id_fkey" FOREIGN KEY ("task_board_id") REFERENCES "task_board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_task" ADD CONSTRAINT "sub_task_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repeat_details" ADD CONSTRAINT "repeat_details_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
