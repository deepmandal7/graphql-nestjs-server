import { Module } from '@nestjs/common';
import { TimesheetEntryService } from './timesheet_entry.service';
import { TimesheetEntryResolver } from './timesheet_entry.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, TimesheetEntryResolver, TimesheetEntryService],
})
export class TimesheetEntryModule {}
