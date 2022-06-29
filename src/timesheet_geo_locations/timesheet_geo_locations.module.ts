import { Module } from '@nestjs/common';
import { TimesheetGeoLocationsService } from './timesheet_geo_locations.service';
import { TimesheetGeoLocationsResolver } from './timesheet_geo_locations.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    PrismaService,
    TimesheetGeoLocationsResolver,
    TimesheetGeoLocationsService,
  ],
})
export class TimesheetGeoLocationsModule {}
