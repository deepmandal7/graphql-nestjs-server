import { Module } from '@nestjs/common';
import { TimesheetReminderSettingsService } from './timesheet_reminder_settings.service';
import { TimesheetReminderSettingsResolver } from './timesheet_reminder_settings.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    PrismaService,
    TimesheetReminderSettingsResolver,
    TimesheetReminderSettingsService,
  ],
})
export class TimesheetReminderSettingsModule {}
