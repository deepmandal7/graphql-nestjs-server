import { Module } from '@nestjs/common';
import { TimesheetPayrollSettingsService } from './timesheet_payroll_settings.service';
import { TimesheetPayrollSettingsResolver } from './timesheet_payroll_settings.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    PrismaService,
    TimesheetPayrollSettingsResolver,
    TimesheetPayrollSettingsService,
  ],
})
export class TimesheetPayrollSettingsModule {}
