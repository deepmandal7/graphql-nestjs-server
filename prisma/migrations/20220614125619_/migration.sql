/*
  Warnings:

  - You are about to drop the column `clock_in_local_date_time` on the `clock_in_outs` table. All the data in the column will be lost.
  - You are about to drop the column `clock_out_local_date_time` on the `clock_in_outs` table. All the data in the column will be lost.
  - You are about to drop the column `edate` on the `clock_in_outs` table. All the data in the column will be lost.
  - You are about to drop the column `ehour` on the `clock_in_outs` table. All the data in the column will be lost.
  - You are about to drop the column `eminute` on the `clock_in_outs` table. All the data in the column will be lost.
  - You are about to drop the column `emonth` on the `clock_in_outs` table. All the data in the column will be lost.
  - You are about to drop the column `eyear` on the `clock_in_outs` table. All the data in the column will be lost.
  - You are about to drop the column `sdate` on the `clock_in_outs` table. All the data in the column will be lost.
  - You are about to drop the column `shour` on the `clock_in_outs` table. All the data in the column will be lost.
  - You are about to drop the column `sminute` on the `clock_in_outs` table. All the data in the column will be lost.
  - You are about to drop the column `smonth` on the `clock_in_outs` table. All the data in the column will be lost.
  - You are about to drop the column `syear` on the `clock_in_outs` table. All the data in the column will be lost.
  - You are about to drop the column `edate` on the `sub_task` table. All the data in the column will be lost.
  - You are about to drop the column `ehour` on the `sub_task` table. All the data in the column will be lost.
  - You are about to drop the column `eminute` on the `sub_task` table. All the data in the column will be lost.
  - You are about to drop the column `emonth` on the `sub_task` table. All the data in the column will be lost.
  - You are about to drop the column `eyear` on the `sub_task` table. All the data in the column will be lost.
  - You are about to drop the column `sdate` on the `sub_task` table. All the data in the column will be lost.
  - You are about to drop the column `shour` on the `sub_task` table. All the data in the column will be lost.
  - You are about to drop the column `sminute` on the `sub_task` table. All the data in the column will be lost.
  - You are about to drop the column `smonth` on the `sub_task` table. All the data in the column will be lost.
  - You are about to drop the column `syear` on the `sub_task` table. All the data in the column will be lost.
  - The `sub_task_end_date_time` column on the `sub_task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sub_task_start_date_time` column on the `sub_task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `edate` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `ehour` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `eminute` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `emonth` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `eyear` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `sdate` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `shour` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `sminute` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `smonth` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `syear` on the `task` table. All the data in the column will be lost.
  - The `task_start_date_time` column on the `task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `task_end_date_time` column on the `task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `location_id` to the `clock_in_outs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `clock_in_outs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `punch_time` to the `clock_in_outs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `punch_type` to the `clock_in_outs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "punch_type_enum" AS ENUM ('IN', 'OUT');

-- AlterTable
ALTER TABLE "clock_in_outs" DROP COLUMN "clock_in_local_date_time",
DROP COLUMN "clock_out_local_date_time",
DROP COLUMN "edate",
DROP COLUMN "ehour",
DROP COLUMN "eminute",
DROP COLUMN "emonth",
DROP COLUMN "eyear",
DROP COLUMN "sdate",
DROP COLUMN "shour",
DROP COLUMN "sminute",
DROP COLUMN "smonth",
DROP COLUMN "syear",
ADD COLUMN     "location_id" INTEGER NOT NULL,
ADD COLUMN     "project_id" INTEGER NOT NULL,
ADD COLUMN     "punch_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "punch_type" "punch_type_enum" NOT NULL;

-- AlterTable
ALTER TABLE "sub_task" DROP COLUMN "edate",
DROP COLUMN "ehour",
DROP COLUMN "eminute",
DROP COLUMN "emonth",
DROP COLUMN "eyear",
DROP COLUMN "sdate",
DROP COLUMN "shour",
DROP COLUMN "sminute",
DROP COLUMN "smonth",
DROP COLUMN "syear",
DROP COLUMN "sub_task_end_date_time",
ADD COLUMN     "sub_task_end_date_time" TIMESTAMP(3),
DROP COLUMN "sub_task_start_date_time",
ADD COLUMN     "sub_task_start_date_time" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "task" DROP COLUMN "edate",
DROP COLUMN "ehour",
DROP COLUMN "eminute",
DROP COLUMN "emonth",
DROP COLUMN "eyear",
DROP COLUMN "sdate",
DROP COLUMN "shour",
DROP COLUMN "sminute",
DROP COLUMN "smonth",
DROP COLUMN "syear",
DROP COLUMN "task_start_date_time",
ADD COLUMN     "task_start_date_time" TIMESTAMP(3),
DROP COLUMN "task_end_date_time",
ADD COLUMN     "task_end_date_time" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "leave" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "leave_pkey" PRIMARY KEY ("id")
);
