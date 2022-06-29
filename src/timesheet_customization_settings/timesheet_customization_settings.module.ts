import { Module } from '@nestjs/common';
import { TimesheetCustomizationSettingsService } from './timesheet_customization_settings.service';
import { TimesheetCustomizationSettingsResolver } from './timesheet_customization_settings.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    PrismaService,
    TimesheetCustomizationSettingsResolver,
    TimesheetCustomizationSettingsService,
  ],
})
export class TimesheetCustomizationSettingsModule {}
