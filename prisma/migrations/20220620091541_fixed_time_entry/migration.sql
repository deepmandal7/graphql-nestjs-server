-- DropForeignKey
ALTER TABLE "time_entry" DROP CONSTRAINT "time_entry_shift_id_fkey";

-- AlterTable
ALTER TABLE "time_entry" ALTER COLUMN "shift_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "time_entry" ADD CONSTRAINT "time_entry_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "shift"("id") ON DELETE SET NULL ON UPDATE CASCADE;
