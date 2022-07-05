import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeBreakInput } from './dto/create-employee_break.input';
import { UpdateEmployeeBreakInput } from './dto/update-employee_break.input';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Prague');

@Injectable()
export class EmployeeBreaksService {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeBreakInput: CreateEmployeeBreakInput) {
    let timesheetBreakSettings =
      await this.prisma.timesheet_break_settings.findFirst({
        select: {
          is_enabled: true,
          break_configuration: true,
        },
        where: {
          timesheets: {
            is: {
              timesheet_entry: {
                some: {
                  id: createEmployeeBreakInput.timesheet_entry_id,
                },
              },
            },
          },
        },
      });
    if (
      timesheetBreakSettings.is_enabled &&
      timesheetBreakSettings.break_configuration == 'MANUAL'
    ) {
      let timesheetEntry = await this.prisma.timesheet_entry.findUnique({
        where: {
          id: createEmployeeBreakInput.timesheet_entry_id,
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
      let insData: any = createEmployeeBreakInput;
      insData.start_time = dayjs(
        `${timesheetEntry.entry_date.getFullYear()}-${
          timesheetEntry.entry_date.getMonth() + 1
        }-${timesheetEntry.entry_date.getDate()} ${
          createEmployeeBreakInput.start_time
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
      let timesheetEntryUpdData: any = {};
      if (totalBreakHours) {
        timesheetEntryUpdData.total_break_in_ms = totalBreakHours;
      }

      insData.timesheet_entry = {
        connect: {
          id: insData.timesheet_entry_id,
        },
      };
      insData.timesheet_manual_breaks = {
        connect: {
          id: insData.timesheet_manual_breaks_id,
        },
      };
      delete insData.timesheet_manual_breaks_id;
      delete insData.timesheet_entry_id;
      delete insData.timezone;
      let res = await this.prisma.$transaction([
        this.prisma.timesheet_entry.update({
          where: {
            id: insData.timesheet_entry.connect.id,
          },
          data: timesheetEntryUpdData,
        }),
        this.prisma.employee_break.create({ data: insData }),
      ]);
      return res[1];
    }
  }

  async update(id: number, updateEmployeeBreakInput: UpdateEmployeeBreakInput) {
    let updData: any = updateEmployeeBreakInput;
    delete updData.id;
    let timesheetEntry: any = await this.prisma.timesheet_entry.findFirst({
      where: {
        employee_break: { some: { id } },
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

    let timesheetEntryUpdData: any = {
      total_break_in_ms: timesheetEntry.total_break_in_ms,
    };
    if (totalBreakHours) {
      timesheetEntryUpdData.total_break_in_ms = totalBreakHours;
    }

    updData.timesheet_manual_breaks = {
      connect: {
        id: updData.timesheet_manual_breaks_id,
      },
    };

    delete updData.timesheet_manual_breaks_id;
    delete updData.timezone;
    let res = await this.prisma.$transaction([
      this.prisma.timesheet_entry.update({
        where: {
          id: timesheetEntry.id,
        },
        data: timesheetEntryUpdData,
      }),
      this.prisma.employee_break.update({ where: { id }, data: updData }),
    ]);
    return res[1];
  }

  async remove(id: number) {
    return await this.prisma.employee_break.update({
      where: {
        id,
      },
      data: {
        status: 'DELETED',
      },
    });
  }
}
