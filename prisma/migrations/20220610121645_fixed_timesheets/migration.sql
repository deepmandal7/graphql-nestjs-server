/*
  Warnings:

  - You are about to drop the column `created_by` on the `timesheets` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `timesheets` table. All the data in the column will be lost.
  - You are about to drop the `_admin_ids` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_user_ids` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_by_id` to the `timesheets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeclock_name` to the `timesheets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_admin_ids" DROP CONSTRAINT "_admin_ids_A_fkey";

-- DropForeignKey
ALTER TABLE "_admin_ids" DROP CONSTRAINT "_admin_ids_B_fkey";

-- DropForeignKey
ALTER TABLE "_user_ids" DROP CONSTRAINT "_user_ids_A_fkey";

-- DropForeignKey
ALTER TABLE "_user_ids" DROP CONSTRAINT "_user_ids_B_fkey";

-- AlterTable
ALTER TABLE "timesheets" DROP COLUMN "created_by",
DROP COLUMN "title",
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "timeclock_name" TEXT NOT NULL;

-- DropTable
DROP TABLE "_admin_ids";

-- DropTable
DROP TABLE "_user_ids";

-- CreateTable
CREATE TABLE "_users" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_admins" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_users_AB_unique" ON "_users"("A", "B");

-- CreateIndex
CREATE INDEX "_users_B_index" ON "_users"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_admins_AB_unique" ON "_admins"("A", "B");

-- CreateIndex
CREATE INDEX "_admins_B_index" ON "_admins"("B");

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timesheets" ADD CONSTRAINT "timesheets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users" ADD FOREIGN KEY ("A") REFERENCES "timesheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users" ADD FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admins" ADD FOREIGN KEY ("A") REFERENCES "timesheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admins" ADD FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
