import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeBreakPendingInput } from './dto/create-employee_break_pending.input';
import { QueryEmployeeBreakPendingInput } from './dto/query-employee_break_pending.input';
import { UpdateEmployeeBreakPendingInput } from './dto/update-employee_break_pending.input';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Prague');

@Injectable()
export class EmployeeBreakPendingService {
  constructor(private prisma: PrismaService) {}

  async create(
    createEmployeeBreakPendingInput: CreateEmployeeBreakPendingInput,
  ) {
    let timesheetEntry = await this.prisma.timesheet_entry.findUnique({
      where: {
        id: createEmployeeBreakPendingInput.timesheet_entry_id,
      },
      select: {
        entry_date: true,
        timesheet_clockin_time: true,
        timesheet_clockout_time: true,
        total_work_in_ms: true,
        total_break_in_ms: true,
        employee_break: {
          select: {
            start_time: true,
            end_time: true,
          },
          where: {
            status: {
              equals: null,
            },
          },
        },
      },
    });
    let insData: any = createEmployeeBreakPendingInput;
    insData.start_time = dayjs(
      `${timesheetEntry.entry_date.getFullYear()}-${
        timesheetEntry.entry_date.getMonth() + 1
      }-${timesheetEntry.entry_date.getDate()} ${
        createEmployeeBreakPendingInput.start_time
      }`,
    )
      .tz(insData.timezone, true)
      .toDate();

    switch (insData.start_day_type) {
      case 'NEXT':
        // dayjs(entry.check_in_time).add(1, 'day');
        insData.start_time.setDate(insData.start_time.getDate() + 1);
        break;
      case 'PREVIOUS':
        // dayjs(entry.check_in_time).subtract(1, 'day');
        insData.start_time.setDate(insData.start_time.getDate() - 1);
        break;
    }

    if (insData.end_time) {
      insData.end_time = dayjs(
        `${timesheetEntry.entry_date.getFullYear()}-${
          timesheetEntry.entry_date.getMonth() + 1
        }-${timesheetEntry.entry_date.getDate()} ${insData.end_time}`,
      )
        .tz(insData.timezone, true)
        .toDate();
      switch (insData.end_day_type) {
        case 'NEXT':
          // dayjs(entry.check_out_time).add(1, 'day');
          insData.end_time.setDate(insData.end_time.getDate() + 1);
          break;
        case 'PREVIOUS':
          // dayjs(entry.check_out_time).subtract(1, 'day');
          insData.end_time.setDate(insData.end_time.getDate() - 1);
          break;
      }
    }

    for (let entry of timesheetEntry.employee_break) {
      if (
        (insData.start_time &&
          insData.start_time >= entry.start_time &&
          entry.end_time &&
          insData.start_time &&
          insData.start_time <= entry.end_time) ||
        (insData.end_time &&
          insData.end_time >= entry.start_time &&
          insData.end_time &&
          entry.end_time &&
          insData.end_time <= entry.end_time)
      ) {
        throw new BadRequestException({
          message: `Break(s) overlapped`,
          error: 'Bad Request',
        });
      }
    }

    let totalBreakHours = 0;
    if (insData.end_time) {
      totalBreakHours =
        timesheetEntry.total_break_in_ms +
        (insData.end_time - insData.start_time);
      if (totalBreakHours > 86400000) {
        throw new BadRequestException({
          message: `Time entry(s) exceed 24 hours`,
          error: 'Bad Request',
        });
      }
    }
    if (totalBreakHours) {
      insData.total_break_in_ms = totalBreakHours;
    }

    insData.timesheet_entry = {
      connect: {
        id: insData.timesheet_entry_id,
      },
    };
    insData.timesheet = {
      connect: {
        id: insData.timesheet_id,
      },
    };
    insData.timesheet_manual_breaks = {
      connect: {
        id: insData.timesheet_manual_breaks_id,
      },
    };
    delete insData.timesheet_id;
    delete insData.timesheet_manual_breaks_id;
    delete insData.timesheet_entry_id;
    delete insData.timezone;

    return await this.prisma.employee_break_pending.create({ data: insData });
  }

  async findAll(
    take: number,
    cursor,
    queryEmployeeBreakPendingInput: QueryEmployeeBreakPendingInput,
    orgId: number,
    searchText: string | null,
  ) {
    let filter: any = {
      where: {
        timesheet_id: queryEmployeeBreakPendingInput.timesheetId,
      },
      take,
    };
    if (cursor) {
      filter.cursor = cursor;
      filter.skip = 1;
    }
    return await this.prisma.employee_break_pending.findMany(filter);
  }

  async findOne(id: number) {
    return await this.prisma.employee_break_pending.findUnique({
      where: { id },
      select: {
        id: true,
        timesheet_manual_breaks: true,
        duration: true,
        start_time: true,
        start_day_type: true,
        end_time: true,
        end_day_type: true,
        total_break_in_ms: true,
        employee_break: true,
      },
    });
  }

  async update(
    id: number,
    updateEmployeeBreakPendingInput: UpdateEmployeeBreakPendingInput,
  ) {
    let updData: any = updateEmployeeBreakPendingInput;
    delete updData.id;
    let timesheetEntry: any = await this.prisma.timesheet_entry.findFirst({
      where: {
        id: updateEmployeeBreakPendingInput.timesheet_entry_id,
      },
      select: {
        id: true,
        entry_date: true,
        timesheet_clockin_time: true,
        timesheet_clockout_time: true,
        total_work_in_ms: true,
        total_break_in_ms: true,
        employee_break: {
          select: {
            id: true,
            start_time: true,
            end_time: true,
          },
          where: {
            status: {
              equals: null,
            },
          },
        },
      },
    });

    if (updData.start_time) {
      updData.start_time = dayjs(
        `${timesheetEntry.entry_date.getFullYear()}-${
          timesheetEntry.entry_date.getMonth() + 1
        }-${timesheetEntry.entry_date.getDate()} ${updData.start_time}`,
      )
        .tz(updData.timezone, true)
        .toDate();

      switch (updData.start_day_type) {
        case 'NEXT':
          // dayjs(entry.check_in_time).add(1, 'day');
          updData.start_time.setDate(updData.start_time.getDate() + 1);
          break;
        case 'PREVIOUS':
          // dayjs(entry.check_in_time).subtract(1, 'day');
          updData.start_time.setDate(updData.start_time.getDate() - 1);
          break;
      }
    }

    if (updData.end_time) {
      updData.end_time = dayjs(
        `${timesheetEntry.entry_date.getFullYear()}-${
          timesheetEntry.entry_date.getMonth() + 1
        }-${timesheetEntry.entry_date.getDate()} ${updData.end_time}`,
      )
        .tz(updData.timezone, true)
        .toDate();
      switch (updData.end_day_type) {
        case 'NEXT':
          // dayjs(entry.check_out_time).add(1, 'day');
          updData.end_time.setDate(updData.end_time.getDate() + 1);
          break;
        case 'PREVIOUS':
          // dayjs(entry.check_out_time).subtract(1, 'day');
          updData.end_time.setDate(updData.end_time.getDate() - 1);
          break;
      }
    }

    for (let entry of timesheetEntry.employee_break) {
      if (id != entry.id)
        if (
          (updData.start_time &&
            updData.start_time >= entry.start_time &&
            entry.end_time &&
            updData.start_time &&
            updData.start_time <= entry.end_time) ||
          (updData.end_time &&
            updData.end_time >= entry.start_time &&
            updData.end_time &&
            entry.end_time &&
            updData.end_time <= entry.end_time)
        ) {
          throw new BadRequestException({
            message: `Break(s) overlapped`,
            error: 'Bad Request',
          });
        }
    }

    // let breakHours = 0;
    // if (updData.end_time) {
    //   breakHours = updData.end_time - updData.start_time;
    // }

    let originalEntry = timesheetEntry.employee_break.filter((entry) => {
      return entry.id == id;
    });

    let totalBreakHours = 0;
    if (updData.end_time) {
      totalBreakHours =
        timesheetEntry.total_break_in_ms -
        (originalEntry[0].end_time - originalEntry[0].start_time) +
        (updData.end_time - updData.start_time);
      if (totalBreakHours > 86400000) {
        throw new BadRequestException({
          message: `Break(s) exceed 24 hours`,
          error: 'Bad Request',
        });
      }
    }
    if (totalBreakHours) {
      updData.total_break_in_ms = totalBreakHours;
    }

    updData.timesheet_manual_breaks = {
      connect: {
        id: updData.timesheet_manual_breaks_id,
      },
    };

    delete updData.timesheet_manual_breaks_id;
    delete updData.timezone;
    return await this.prisma.employee_break.update({
      where: { id },
      data: updData,
    });
  }

  async remove(id: number) {
    return await this.prisma.employee_break_pending.delete({
      where: {
        id,
      },
    });
  }

  async approveReject(id: number, status: string) {
    if (status == 'APPROVED') {
      let employeeBreakPending =
        await this.prisma.employee_break_pending.findUnique({
          where: {
            id,
          },
        });

      let timesheetEntryUpdData: any = {
        total_break_in_ms: employeeBreakPending.total_break_in_ms,
      };

      let res = await this.prisma.$transaction([
        this.prisma.timesheet_entry.update({
          where: {
            id: employeeBreakPending.timesheet_id,
          },
          data: timesheetEntryUpdData,
        }),
        this.prisma.time_entry.update({
          where: { id },
          data: employeeBreakPending,
        }),
        this.prisma.employee_break_pending.delete({
          where: { id },
        }),
      ]);
      return res[1];
    } else {
      return await this.prisma.employee_break_pending.delete({
        where: {
          id,
        },
      });
    }
  }
}
