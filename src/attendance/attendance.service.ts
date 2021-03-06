import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { QueryAttendanceInput } from './dto/query-attendance.input';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    take: number,
    cursor,
    queryAttendanceInput: QueryAttendanceInput,
    orgId: number,
    searchText: string | null,
  ) {
    let timesheetEntryFilter: any = queryAttendanceInput;
    timesheetEntryFilter.status = {
      not: 'DELETED',
    };

    timesheetEntryFilter.entry_date = {
      gte: new Date(
        +timesheetEntryFilter.from_date.split('-')[0],
        +timesheetEntryFilter.from_date.split('-')[1] - 1,
        +timesheetEntryFilter.from_date.split('-')[2],
      ),
      lte: new Date(
        +timesheetEntryFilter.to_date.split('-')[0],
        +timesheetEntryFilter.to_date.split('-')[1] - 1,
        +timesheetEntryFilter.to_date.split('-')[2],
      ),
    };

    let timeOffFilter: any = queryAttendanceInput;
    timeOffFilter.from_date = {
      gte: new Date(
        +timeOffFilter.from_date.split('-')[0],
        +timeOffFilter.from_date.split('-')[1] - 1,
        +timeOffFilter.from_date.split('-')[2],
      ),
      lte: new Date(
        +timeOffFilter.to_date.split('-')[0],
        +timeOffFilter.to_date.split('-')[1] - 1,
        +timeOffFilter.to_date.split('-')[2],
      ),
    };
    let shiftFilter: any = queryAttendanceInput;
    shiftFilter.start_time = {
      gte: new Date(
        +shiftFilter.from_date.split('-')[0],
        +shiftFilter.from_date.split('-')[1] - 1,
        +shiftFilter.from_date.split('-')[2],
      ),
      lte: new Date(
        +shiftFilter.to_date.split('-')[0],
        +shiftFilter.to_date.split('-')[1] - 1,
        +shiftFilter.to_date.split('-')[2],
      ),
    };
    delete timesheetEntryFilter.from_date &&
      delete timesheetEntryFilter.to_date &&
      delete timeOffFilter.from_date &&
      delete timeOffFilter.to_date &&
      delete shiftFilter.from_date &&
      delete shiftFilter.to_date;

    return {
      timesheet_entry: await this.prisma.timesheet_entry.findMany({
        where: timesheetEntryFilter,
        select: {
          id: true,
          status: true,
          entry_date: true,
          total_work_in_ms: true,
          total_break_in_ms: true,
          total_hours_in_ms: true,
        },
      }),
      time_off: await this.prisma.time_off.findMany({
        where: timeOffFilter,
        select: {
          time_off_type: {
            select: {
              name: true,
            },
          },
          leave_type_enum: true,
          from_date: true,
          to_date: true,
          from_time: true,
          to_time: true,
        },
      }),
      shift: await this.prisma.shift.findMany({
        where: {},
      }),
    };
  }
}
