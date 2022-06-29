/*
  Warnings:

  - Added the required column `updated_at` to the `timesheet_geo_location_settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `timesheet_geo_locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `timesheet_geo_locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `timesheet_notification_settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `timesheet_reminder_settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timesheet_geo_location_settings" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "timesheet_geo_locations" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "timesheet_notification_settings" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "timesheet_reminder_settings" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "timesheet_geo_locations" ADD CONSTRAINT "timesheet_geo_locations_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
