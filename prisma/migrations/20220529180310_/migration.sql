/*
  Warnings:

  - You are about to drop the column `user_ids` on the `sub_task` table. All the data in the column will be lost.
  - You are about to drop the column `user_ids` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sub_task" DROP COLUMN "user_ids";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "user_ids";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clock_ins" (
    "id" SERIAL NOT NULL,
    "timeclock_id" INTEGER NOT NULL,

    CONSTRAINT "clock_ins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_taskTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_sub_taskTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_clock_insTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_taskTouser_AB_unique" ON "_taskTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_taskTouser_B_index" ON "_taskTouser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_sub_taskTouser_AB_unique" ON "_sub_taskTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_sub_taskTouser_B_index" ON "_sub_taskTouser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_clock_insTouser_AB_unique" ON "_clock_insTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_clock_insTouser_B_index" ON "_clock_insTouser"("B");

-- AddForeignKey
ALTER TABLE "clock_ins" ADD CONSTRAINT "clock_ins_timeclock_id_fkey" FOREIGN KEY ("timeclock_id") REFERENCES "timeclock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_taskTouser" ADD CONSTRAINT "_taskTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_taskTouser" ADD CONSTRAINT "_taskTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sub_taskTouser" ADD CONSTRAINT "_sub_taskTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "sub_task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sub_taskTouser" ADD CONSTRAINT "_sub_taskTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_clock_insTouser" ADD CONSTRAINT "_clock_insTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "clock_ins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_clock_insTouser" ADD CONSTRAINT "_clock_insTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
