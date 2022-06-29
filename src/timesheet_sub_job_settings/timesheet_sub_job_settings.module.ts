import { Module } from '@nestjs/common';
import { TimesheetSubJobSettingsService } from './timesheet_sub_job_settings.service';
import { TimesheetSubJobSettingsResolver } from './timesheet_sub_job_settings.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    PrismaService,
    TimesheetSubJobSettingsResolver,
    TimesheetSubJobSettingsService,
  ],
})
export class TimesheetSubJobSettingsModule {}
