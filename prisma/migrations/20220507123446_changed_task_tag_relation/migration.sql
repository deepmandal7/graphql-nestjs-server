-- CreateEnum
CREATE TYPE "can_create_enum" AS ENUM ('EVERYONE', 'ADMIN');

-- CreateEnum
CREATE TYPE "task_frequency_enum" AS ENUM ('ONEOFF', 'RECURRING');

-- CreateEnum
CREATE TYPE "repeat_type_enum" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateTable
CREATE TABLE "organization" (
    "id" SERIAL NOT NULL,
    "org_name" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_board" (
    "id" SERIAL NOT NULL,
    "task_board_name" TEXT NOT NULL,
    "org_id" INTEGER NOT NULL,
    "can_create" "can_create_enum" NOT NULL,
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
    "task_start_date_time" TEXT,
    "task_end_date_time" TEXT,
    "task_coordinates" DOUBLE PRECISION[],
    "task_location" TEXT NOT NULL,
    "task_board_id" INTEGER NOT NULL,
    "task_status" TEXT NOT NULL,
    "user_ids" INTEGER[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_task" (
    "id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "eyear" INTEGER NOT NULL,
    "emonth" INTEGER NOT NULL,
    "edate" INTEGER NOT NULL,
    "ehour" INTEGER NOT NULL,
    "eminute" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER NOT NULL,

    CONSTRAINT "sub_task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repeat_details" (
    "id" SERIAL NOT NULL,
    "stop_repeat" TIMESTAMP(3),
    "repeat_type" "repeat_type_enum" NOT NULL,
    "task_id" INTEGER NOT NULL,
    "how_often_repeat" INTEGER NOT NULL,
    "day_of_week" INTEGER[],
    "day_of_month" INTEGER,
    "week_of_month" INTEGER,
    "month_of_year" INTEGER,

    CONSTRAINT "repeat_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "tag_name" TEXT NOT NULL,
    "tag_color" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_tag" (
    "task_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "task_tag_pkey" PRIMARY KEY ("task_id","tag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_org_name_key" ON "organization"("org_name");

-- CreateIndex
CREATE UNIQUE INDEX "task_board_task_board_name_key" ON "task_board"("task_board_name");

-- CreateIndex
CREATE UNIQUE INDEX "task_task_title_key" ON "task"("task_title");

-- CreateIndex
CREATE UNIQUE INDEX "repeat_details_task_id_key" ON "repeat_details"("task_id");

-- CreateIndex
CREATE UNIQUE INDEX "task_tag_task_id_key" ON "task_tag"("task_id");

-- CreateIndex
CREATE UNIQUE INDEX "task_tag_tag_id_key" ON "task_tag"("tag_id");

-- AddForeignKey
ALTER TABLE "task_board" ADD CONSTRAINT "task_board_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_task_board_id_fkey" FOREIGN KEY ("task_board_id") REFERENCES "task_board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_task" ADD CONSTRAINT "sub_task_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repeat_details" ADD CONSTRAINT "repeat_details_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task_tag" ADD CONSTRAINT "task_tag_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_tag" ADD CONSTRAINT "task_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
