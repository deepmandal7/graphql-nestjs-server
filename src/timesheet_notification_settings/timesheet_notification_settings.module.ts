import { Module } from '@nestjs/common';
import { TimesheetNotificationSettingsService } from './timesheet_notification_settings.service';
import { TimesheetNotificationSettingsResolver } from './timesheet_notification_settings.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    PrismaService,
    TimesheetNotificationSettingsResolver,
    TimesheetNotificationSettingsService,
  ],
})
export class TimesheetNotificationSettingsModule {}
