-- AlterTable
ALTER TABLE "clock_in_outs" ALTER COLUMN "clock_in_local_date_time" DROP NOT NULL,
ALTER COLUMN "clock_out_local_date_time" DROP NOT NULL;
