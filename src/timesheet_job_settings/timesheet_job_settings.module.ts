import { Module } from '@nestjs/common';
import { TimesheetJobSettingsService } from './timesheet_job_settings.service';
import { TimesheetJobSettingsResolver } from './timesheet_job_settings.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    PrismaService,
    TimesheetJobSettingsResolver,
    TimesheetJobSettingsService,
  ],
})
export class TimesheetJobSettingsModule {}
