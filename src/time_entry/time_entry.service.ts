import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTimeEntryInput } from './dto/create-time_entry.input';
import { UpdateTimeEntryInput } from './dto/update-time_entry.input';
import { PrismaService } from 'src/prisma.service';
import { mapIDArrayToEnum } from 'src/common/utils/common_utils';
import { Prisma } from '@prisma/client';
import { QueryTimeEntryInput } from './dto/query-time_entry.input';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Prague');

@Injectable()
export class TimeEntryService {
  constructor(private prisma: PrismaService) {}

  async create(createTimeEntryInput: CreateTimeEntryInput) {
    let insData: any = createTimeEntryInput;
    insData.timesheet_entry = {
      connect: {
        id: insData.timesheet_entry_id,
      },
    };
    insData.created_by = {
      connect: {
        id: createTimeEntryInput.created_by_id,
      },
    };
    let timesheetEntry: any = await this.prisma.timesheet_entry.findUnique({
      where: {
        id: insData.timesheet_entry_id,
      },
      select: {
        entry_date: true,
        total_work_in_ms: true,
        timesheet_clockin_time: true,
        timesheet_clockout_time: true,
        time_entry: {
          select: {
            check_in_time: true,
            check_in_day_type: true,
            check_out_time: true,
            check_out_day_type: true,
          },
          where: {
            status: {
              equals: null,
            },
          },
        },
      },
    });
    insData.check_in_time = dayjs(
      `${timesheetEntry.entry_date.getFullYear()}-${
        timesheetEntry.entry_date.getMonth() + 1
      }-${timesheetEntry.entry_date.getDate()} ${insData.check_in_time}`,
    )
      .tz(insData.timezone, true)
      .toDate();

    switch (insData.check_in_day_type) {
      case 'NEXT':
        // dayjs(entry.check_in_time).add(1, 'day');
        insData.check_in_time.setDate(insData.check_in_time.getDate() + 1);
        break;
      case 'PREVIOUS':
        // dayjs(entry.check_in_time).subtract(1, 'day');
        insData.check_in_time.setDate(insData.check_in_time.getDate() - 1);
        break;
    }

    if (insData.check_out_time) {
      insData.check_out_time = dayjs(
        `${timesheetEntry.entry_date.getFullYear()}-${
          timesheetEntry.entry_date.getMonth() + 1
        }-${timesheetEntry.entry_date.getDate()} ${insData.check_out_time}`,
      )
        .tz(insData.timezone, true)
        .toDate();
      switch (insData.check_out_day_type) {
        case 'NEXT':
          // dayjs(entry.check_out_time).add(1, 'day');
          insData.check_out_time.setDate(insData.check_out_time.getDate() + 1);
          break;
        case 'PREVIOUS':
          // dayjs(entry.check_out_time).subtract(1, 'day');
          insData.check_out_time.setDate(insData.check_out_time.getDate() - 1);
          break;
      }
    }
    for (let entry of timesheetEntry.time_entry) {
      if (
        (insData.check_in_time &&
          insData.check_in_time >= entry.check_in_time &&
          entry.check_out_time &&
          insData.check_in_time &&
          insData.check_in_time <= entry.check_out_time) ||
        (insData.check_out_time &&
          insData.check_out_time >= entry.check_in_time &&
          insData.check_out_time &&
          entry.check_out_time &&
          insData.check_out_time <= entry.check_out_time)
      ) {
        throw new BadRequestException({
          message: `Time entry(s) overlapped`,
          error: 'Bad Request',
        });
      }
    }
    let totalWorkHours = 0;
    if (insData.check_out_time) {
      totalWorkHours =
        timesheetEntry.total_work_in_ms +
        (insData.check_out_time - insData.check_in_time);
      if (totalWorkHours > 86400000) {
        throw new BadRequestException({
          message: `Time entry(s) exceed 24 hours`,
          error: 'Bad Request',
        });
      }
    }

    timesheetEntry.time_entry.push({
      check_in_time: insData.check_in_time,
      check_in_day_type: insData.check_in_day_type,
      check_out_time: insData.check_out_time,
      check_out_day_type: insData.check_out_day_type,
    });

    timesheetEntry.time_entry = timesheetEntry.time_entry.sort(
      (entry1, entry2) => {
        return entry1.check_in_time - entry2.check_in_time;
      },
    );

    let timesheetEntryUpdData: any = {};
    if (
      timesheetEntry.timesheet_clockin_time !=
      timesheetEntry.time_entry[0].check_in_time
    ) {
      timesheetEntryUpdData.timesheet_clockin_time =
        timesheetEntry.time_entry[0].check_in_time;
    }
    if (
      timesheetEntry.timesheet_clockout_time !=
      timesheetEntry.time_entry[timesheetEntry.time_entry.length - 1]
        .check_out_time
    ) {
      timesheetEntryUpdData.timesheet_clockout_time =
        timesheetEntry.time_entry[
          timesheetEntry.time_entry.length - 1
        ].check_out_time;
    }
    if (totalWorkHours) {
      timesheetEntryUpdData.total_work_in_ms = totalWorkHours;
    }
    delete insData.timesheet_entry_id;
    delete insData.timezone;
    delete insData.created_by_id;

    let res = await this.prisma.$transaction([
      this.prisma.timesheet_entry.update({
        where: {
          id: insData.timesheet_entry.connect.id,
        },
        data: timesheetEntryUpdData,
      }),
      this.prisma.time_entry.create({ data: insData }),
    ]);
    return res[1];
  }

  async update(id: number, updateTimeEntryInput: UpdateTimeEntryInput) {
    let updData: any = updateTimeEntryInput;
    delete updData.id;

    let timesheetEntry: any = await this.prisma.timesheet_entry.findFirst({
      where: {
        time_entry: {
          some: {
            id,
          },
        },
      },
      select: {
        id: true,
        entry_date: true,
        total_work_in_ms: true,
        timesheet_clockin_time: true,
        timesheet_clockout_time: true,
        time_entry: {
          select: {
            id: true,
            check_in_time: true,
            check_in_day_type: true,
            check_out_time: true,
            check_out_day_type: true,
          },
          where: {
            status: {
              equals: null,
            },
          },
        },
      },
    });
    if (updData.check_in_time) {
      updData.check_in_time = dayjs(
        `${timesheetEntry.entry_date.getFullYear()}-${
          timesheetEntry.entry_date.getMonth() + 1
        }-${timesheetEntry.entry_date.getDate()} ${updData.check_in_time}`,
      )
        .tz(updData.timezone, true)
        .toDate();

      switch (updData.check_in_day_type) {
        case 'NEXT':
          // dayjs(entry.check_in_time).add(1, 'day');
          updData.check_in_time.setDate(updData.check_in_time.getDate() + 1);
          break;
        case 'PREVIOUS':
          // dayjs(entry.check_in_time).subtract(1, 'day');
          updData.check_in_time.setDate(updData.check_in_time.getDate() - 1);
          break;
      }
    }

    if (updData.check_out_time) {
      updData.check_out_time = dayjs(
        `${timesheetEntry.entry_date.getFullYear()}-${
          timesheetEntry.entry_date.getMonth() + 1
        }-${timesheetEntry.entry_date.getDate()} ${updData.check_out_time}`,
      )
        .tz(updData.timezone, true)
        .toDate();
      switch (updData.check_out_day_type) {
        case 'NEXT':
          // dayjs(entry.check_out_time).add(1, 'day');
          updData.check_out_time.setDate(updData.check_out_time.getDate() + 1);
          break;
        case 'PREVIOUS':
          // dayjs(entry.check_out_time).subtract(1, 'day');
          updData.check_out_time.setDate(updData.check_out_time.getDate() - 1);
          break;
      }
    }
    for (let entry of timesheetEntry.time_entry) {
      if (entry.id != id)
        if (
          (updData.check_in_time &&
            updData.check_in_time >= entry.check_in_time &&
            entry.check_out_time &&
            updData.check_in_time <= entry.check_out_time) ||
          (updData.check_out_time &&
            updData.check_out_time >= entry.check_in_time &&
            updData.check_out_time &&
            entry.check_out_time &&
            updData.check_out_time <= entry.check_out_time)
        ) {
          throw new BadRequestException({
            message: `Time entry(s) overlapped`,
            error: 'Bad Request',
          });
        }
    }
    let originalEntry = timesheetEntry.time_entry.filter((entry) => {
      return entry.id == id;
    });

    let totalWorkHours = 0;
    if (updData.check_out_time) {
      totalWorkHours =
        timesheetEntry.total_work_in_ms -
        (originalEntry[0].check_out_time - originalEntry[0].check_in_time) +
        (updData.check_out_time - updData.check_in_time);
      if (totalWorkHours > 86400000) {
        throw new BadRequestException({
          message: `Time entry(s) exceed 24 hours`,
          error: 'Bad Request',
        });
      }
    }

    timesheetEntry.time_entry.push({
      check_in_time: updData.check_in_time,
      check_in_day_type: updData.check_in_day_type,
      check_out_time: updData.check_out_time,
      check_out_day_type: updData.check_out_day_type,
    });

    timesheetEntry.time_entry = timesheetEntry.time_entry.sort(
      (entry1, entry2) => {
        return entry1.check_in_time - entry2.check_in_time;
      },
    );

    let timesheetEntryUpdData: any = {};
    if (
      timesheetEntry.timesheet_clockin_time !=
      timesheetEntry.time_entry[0].check_in_time
    ) {
      timesheetEntryUpdData.timesheet_clockin_time =
        timesheetEntry.time_entry[0].check_in_time;
    }
    if (
      timesheetEntry.time_entry[timesheetEntry.time_entry.length - 1]
        .check_out_time &&
      timesheetEntry.timesheet_clockout_time !=
        timesheetEntry.time_entry[timesheetEntry.time_entry.length - 1]
          .check_out_time
    ) {
      timesheetEntryUpdData.timesheet_clockout_time =
        timesheetEntry.time_entry[
          timesheetEntry.time_entry.length - 1
        ].check_out_time;
    }
    if (totalWorkHours) {
      timesheetEntryUpdData.total_work_in_ms = totalWorkHours;
    }
    delete updData.timezone;

    let res = await this.prisma.$transaction([
      this.prisma.timesheet_entry.update({
        where: {
          id: timesheetEntry.id,
        },
        data: timesheetEntryUpdData,
      }),
      this.prisma.time_entry.update({ where: { id }, data: updData }),
    ]);
    return res[1];
    // let updData = updateTimeEntryInput;

    // return await this.prisma.time_entry.update({
    //   where: {
    //     id,
    //   },
    //   data: updData,
    // });
  }

  async remove(id: number) {
    return await this.prisma.time_entry.update({
      where: {
        id,
      },
      data: {
        status: 'DELETED',
      },
    });
  }
}
