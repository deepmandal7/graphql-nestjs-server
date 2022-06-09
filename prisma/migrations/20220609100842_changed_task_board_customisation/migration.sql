/*
  Warnings:

  - You are about to drop the column `description_mandatory` on the `task_board_customisation` table. All the data in the column will be lost.
  - You are about to drop the column `description_required` on the `task_board_customisation` table. All the data in the column will be lost.
  - You are about to drop the column `location_mandatory` on the `task_board_customisation` table. All the data in the column will be lost.
  - You are about to drop the column `location_required` on the `task_board_customisation` table. All the data in the column will be lost.
  - You are about to drop the column `task_title_mandatory` on the `task_board_customisation` table. All the data in the column will be lost.
  - Added the required column `field_name` to the `task_board_customisation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "task_board_customisation" DROP CONSTRAINT "task_board_customisation_task_board_id_fkey";

-- DropIndex
DROP INDEX "task_board_customisation_task_board_id_key";

-- AlterTable
ALTER TABLE "task_board_customisation" DROP COLUMN "description_mandatory",
DROP COLUMN "description_required",
DROP COLUMN "location_mandatory",
DROP COLUMN "location_required",
DROP COLUMN "task_title_mandatory",
ADD COLUMN     "field_name" TEXT NOT NULL,
ADD COLUMN     "mandatory" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "visibility" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "task_board_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "task_board_customisation" ADD CONSTRAINT "task_board_customisation_task_board_id_fkey" FOREIGN KEY ("task_board_id") REFERENCES "task_board"("id") ON DELETE SET NULL ON UPDATE CASCADE;
