/*
  Warnings:

  - You are about to drop the column `clockin_time` on the `timeclock` table. All the data in the column will be lost.
  - You are about to drop the column `clockout_time` on the `timeclock` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `timeclock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "timeclock" DROP COLUMN "clockin_time",
DROP COLUMN "clockout_time",
DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "_user_ids" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_admin_ids" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_user_ids_AB_unique" ON "_user_ids"("A", "B");

-- CreateIndex
CREATE INDEX "_user_ids_B_index" ON "_user_ids"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_admin_ids_AB_unique" ON "_admin_ids"("A", "B");

-- CreateIndex
CREATE INDEX "_admin_ids_B_index" ON "_admin_ids"("B");

-- AddForeignKey
ALTER TABLE "_user_ids" ADD FOREIGN KEY ("A") REFERENCES "timeclock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_ids" ADD FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin_ids" ADD FOREIGN KEY ("A") REFERENCES "timeclock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin_ids" ADD FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
