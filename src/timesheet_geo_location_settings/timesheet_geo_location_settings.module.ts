import { Module } from '@nestjs/common';
import { TimesheetGeoLocationSettingsService } from './timesheet_geo_location_settings.service';
import { TimesheetGeoLocationSettingsResolver } from './timesheet_geo_location_settings.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    PrismaService,
    TimesheetGeoLocationSettingsResolver,
    TimesheetGeoLocationSettingsService,
  ],
})
export class TimesheetGeoLocationSettingsModule {}
