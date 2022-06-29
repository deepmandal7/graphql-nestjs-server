/*
  Warnings:

  - The values [FIRSTLAST] on the enum `working_hours_calculation_enum` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `fifth` on the `workweeks` table. All the data in the column will be lost.
  - You are about to drop the column `fifth_end_time` on the `workweeks` table. All the data in the column will be lost.
  - You are about to drop the column `fifth_start_time` on the `workweeks` table. All the data in the column will be lost.
  - You are about to drop the column `first` on the `workweeks` table. All the data in the column will be lost.
  - You are about to drop the column `first_end_time` on the `workweeks` table. All the data in the column will be lost.
  - You are about to drop the column `first_start_time` on the `workweeks` table. All the data in the column will be lost.
  - You are about to drop the column `fourth` on the `workweeks` table. All the data in the column will be lost.
  - You are about to drop the column `fourth_end_time` on the `workweeks` table. All the data in the column will be lost.
  - You are about to drop the column `fourth_start_time` on the `workweeks` table. All the data in the column will be lost.
  - You are about to drop the column `second` on the `workweeks` table. All the data in the column will be lost.
  - You are about to drop the column `second_end_time` on the `workweeks` table. All the data in the column will be lost.
  - You are about to drop the column `second_start_time` on the `workweeks` table. All the data in the column will be lost.
  - You are about to drop the column `seventh` on the `workweeks` table. All the data in the column will be lost.
  - You are about to drop the column `seventh_end_time` on the `workweeks` table. All the data in the column will be lost.
  - You are about to drop the column `seventh_start_time` on the `workweeks` table. All the data in the column will be lost.
  - You are about to drop the column `third` on the `workweeks` table. All the data in the column will be lost.
  - You are about to drop the column `third_end_time` on the `workweeks` table. All the data in the column will be lost.
  - You are about to drop the column `third_start_time` on the `workweeks` table. All the data in the column will be lost.
  - Added the required column `created_by_id` to the `time_entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `friday` to the `workweeks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `friday_end_time` to the `workweeks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `friday_start_time` to the `workweeks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monday` to the `workweeks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monday_end_time` to the `workweeks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monday_start_time` to the `workweeks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sunday` to the `workweeks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sunday_end_time` to the `workweeks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sunday_start_time` to the `workweeks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thursday` to the `workweeks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thursday_end_time` to the `workweeks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thursday_start_time` to the `workweeks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tuesday` to the `workweeks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tuesday_end_time` to the `workweeks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tuesday_start_time` to the `workweeks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wednesday` to the `workweeks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wednesday_end_time` to the `workweeks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wednesday_start_time` to the `workweeks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "working_hours_calculation_enum_new" AS ENUM ('mondayLAST', 'EVERY');
ALTER TABLE "general_settings" ALTER COLUMN "working_hours_calculation" TYPE "working_hours_calculation_enum_new" USING ("working_hours_calculation"::text::"working_hours_calculation_enum_new");
ALTER TYPE "working_hours_calculation_enum" RENAME TO "working_hours_calculation_enum_old";
ALTER TYPE "working_hours_calculation_enum_new" RENAME TO "working_hours_calculation_enum";
DROP TYPE "working_hours_calculation_enum_old";
COMMIT;

-- AlterTable
ALTER TABLE "time_entry" ADD COLUMN     "created_by_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "workweeks" DROP COLUMN "fifth",
DROP COLUMN "fifth_end_time",
DROP COLUMN "fifth_start_time",
DROP COLUMN "first",
DROP COLUMN "first_end_time",
DROP COLUMN "first_start_time",
DROP COLUMN "fourth",
DROP COLUMN "fourth_end_time",
DROP COLUMN "fourth_start_time",
DROP COLUMN "second",
DROP COLUMN "second_end_time",
DROP COLUMN "second_start_time",
DROP COLUMN "seventh",
DROP COLUMN "seventh_end_time",
DROP COLUMN "seventh_start_time",
DROP COLUMN "third",
DROP COLUMN "third_end_time",
DROP COLUMN "third_start_time",
ADD COLUMN     "friday" BOOLEAN NOT NULL,
ADD COLUMN     "friday_end_time" INTEGER NOT NULL,
ADD COLUMN     "friday_start_time" INTEGER NOT NULL,
ADD COLUMN     "monday" BOOLEAN NOT NULL,
ADD COLUMN     "monday_end_time" INTEGER NOT NULL,
ADD COLUMN     "monday_start_time" INTEGER NOT NULL,
ADD COLUMN     "sunday" BOOLEAN NOT NULL,
ADD COLUMN     "sunday_end_time" INTEGER NOT NULL,
ADD COLUMN     "sunday_start_time" INTEGER NOT NULL,
ADD COLUMN     "thursday" BOOLEAN NOT NULL,
ADD COLUMN     "thursday_end_time" INTEGER NOT NULL,
ADD COLUMN     "thursday_start_time" INTEGER NOT NULL,
ADD COLUMN     "tuesday" BOOLEAN NOT NULL,
ADD COLUMN     "tuesday_end_time" INTEGER NOT NULL,
ADD COLUMN     "tuesday_start_time" INTEGER NOT NULL,
ADD COLUMN     "wednesday" BOOLEAN NOT NULL,
ADD COLUMN     "wednesday_end_time" INTEGER NOT NULL,
ADD COLUMN     "wednesday_start_time" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
