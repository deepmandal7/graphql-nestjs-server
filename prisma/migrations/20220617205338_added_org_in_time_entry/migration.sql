/*
  Warnings:

  - You are about to drop the column `org` on the `time_entry` table. All the data in the column will be lost.
  - Added the required column `org_id` to the `time_entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "time_entry" DROP COLUMN "org",
ADD COLUMN     "org_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
