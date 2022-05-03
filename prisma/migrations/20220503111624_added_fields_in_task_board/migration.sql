/*
  Warnings:

  - Changed the type of `task_frequency` on the `task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `can_create` to the `task_board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customisation` to the `task_board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `task_board` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "can_create_enum" AS ENUM ('EVERYONE', 'ADMIN');

-- CreateEnum
CREATE TYPE "task_frequency_enum" AS ENUM ('ONEOFF', 'RECURRING');

-- AlterTable
ALTER TABLE "task" DROP COLUMN "task_frequency",
ADD COLUMN     "task_frequency" "task_frequency_enum" NOT NULL;

-- AlterTable
ALTER TABLE "task_board" ADD COLUMN     "can_create" "can_create_enum" NOT NULL,
ADD COLUMN     "customisation" JSONB NOT NULL,
ADD COLUMN     "tags" JSONB NOT NULL;

-- DropEnum
DROP TYPE "task_frequency";
