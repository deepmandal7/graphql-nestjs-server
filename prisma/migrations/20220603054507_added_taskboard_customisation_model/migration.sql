-- CreateTable
CREATE TABLE "task_board_customisation" (
    "id" SERIAL NOT NULL,
    "task_title_mandatory" BOOLEAN NOT NULL DEFAULT true,
    "description_required" BOOLEAN NOT NULL DEFAULT true,
    "description_mandatory" BOOLEAN NOT NULL DEFAULT true,
    "location_required" BOOLEAN NOT NULL DEFAULT true,
    "location_mandatory" BOOLEAN NOT NULL DEFAULT true,
    "task_board_id" INTEGER NOT NULL,

    CONSTRAINT "task_board_customisation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "task_board_customisation_task_board_id_key" ON "task_board_customisation"("task_board_id");

-- AddForeignKey
ALTER TABLE "task_board_customisation" ADD CONSTRAINT "task_board_customisation_task_board_id_fkey" FOREIGN KEY ("task_board_id") REFERENCES "task_board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
