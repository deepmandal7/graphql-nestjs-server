/*
  Warnings:

  - You are about to drop the column `recurring_type` on the `repeat_details` table. All the data in the column will be lost.
  - Added the required column `repeat_type` to the `repeat_details` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "repeat_type_enum" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- AlterTable
ALTER TABLE "repeat_details" DROP COLUMN "recurring_type",
ADD COLUMN     "repeat_type" "repeat_type_enum" NOT NULL;

-- DropEnum
DROP TYPE "recurring_type_enum";
