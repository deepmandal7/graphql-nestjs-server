import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTimeEntryPendingInput } from './dto/create-time_entry_pending.input';
import { UpdateTimeEntryPendingInput } from './dto/update-time_entry_pending.input';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { QueryTimeEntryPendingInput } from './dto/query-time_entry_pending.input';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Prague');

@Injectable()
export class TimeEntryPendingService {
  constructor(private prisma: PrismaService) {}

  async create(createTimeEntryPendingInput: CreateTimeEntryPendingInput) {
    let insData: any = createTimeEntryPendingInput;
    insData.timesheet = {
      connect: {
        id: insData.timesheet_id,
      },
    };
    insData.time_entry = {
      connect: {
        id: insData.time_entry_id,
      },
    };
    insData.created_by = {
      connect: {
        id: createTimeEntryPendingInput.created_by_id,
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
          insData.check_out_time <= entry.check_out_time) ||
        (insData.check_in_time <= entry.check_in_time &&
          insData.check_out_time >= entry.check_out_time)
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

    if (
      timesheetEntry.timesheet_clockin_time !=
      timesheetEntry.time_entry[0].check_in_time
    ) {
      insData.timesheet_clockin_time =
        timesheetEntry.time_entry[0].check_in_time;
    }
    if (
      timesheetEntry.timesheet_clockout_time !=
      timesheetEntry.time_entry[timesheetEntry.time_entry.length - 1]
        .check_out_time
    ) {
      insData.timesheet_clockout_time =
        timesheetEntry.time_entry[
          timesheetEntry.time_entry.length - 1
        ].check_out_time;
    }
    if (totalWorkHours) {
      insData.total_work_in_ms = totalWorkHours;
      insData.total_hours_in_ms =
        insData.timesheet_clockout_time - insData.timesheet_clockin_time;
    }
    delete insData.timesheet_id;
    delete insData.time_entry_id;
    delete insData.timezone;
    delete insData.created_by_id;

    if (insData.timesheet_jobs_id) {
      insData.timesheet_jobs = {
        connect: {
          id: insData.timesheet_jobs_id,
        },
      };
    }
    delete insData.timesheet_jobs_id;

    if (insData.timesheet_sub_jobs_id) {
      insData.timesheet_sub_jobs = {
        connect: {
          id: insData.timesheet_sub_jobs_id,
        },
      };
    }
    delete insData.timesheet_sub_jobs_id;
    return await this.prisma.time_entry_pending.create({ data: insData });
  }

  async findAll(
    take: number,
    cursor,
    queryTimeEntryPendingInput: QueryTimeEntryPendingInput,
    orgId: number,
    searchText: string | null,
  ) {
    let filter: any = {
      where: {
        timesheet_id: queryTimeEntryPendingInput.timesheet_id,
      },
      take,
    };
    if (cursor) {
      filter.cursor = cursor;
      filter.skip = 1;
    }
    return await this.prisma.time_entry_pending.findMany(filter);
  }

  async findOne(id: number) {
    return await this.prisma.time_entry_pending.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        check_in_time: true,
        check_in_day_type: true,
        check_out_time: true,
        check_out_day_type: true,
        comments: true,
        timesheet_jobs: true,
        timesheet_sub_jobs: true,
        created_by: true,
        time_entry: true,
      },
    });
  }

  async update(
    id: number,
    updateTimeEntryPendingInput: UpdateTimeEntryPendingInput,
  ) {
    let updData: any = updateTimeEntryPendingInput;
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
            updData.check_out_time <= entry.check_out_time) ||
          (updData.check_in_time <= entry.check_in_time &&
            updData.check_out_time >= entry.check_out_time)
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
    if (
      timesheetEntry.timesheet_clockin_time !=
      timesheetEntry.time_entry[0].check_in_time
    ) {
      updData.timesheet_clockin_time =
        timesheetEntry.time_entry[0].check_in_time;
    }
    if (
      timesheetEntry.timesheet_clockout_time !=
      timesheetEntry.time_entry[timesheetEntry.time_entry.length - 1]
        .check_out_time
    ) {
      updData.timesheet_clockout_time =
        timesheetEntry.time_entry[
          timesheetEntry.time_entry.length - 1
        ].check_out_time;
    }
    if (totalWorkHours) {
      updData.total_work_in_ms = totalWorkHours;
      updData.total_hours_in_ms =
        updData.timesheet_clockout_time - updData.timesheet_clockin_time;
    }
    delete updData.timezone;
    if (updData.timesheet_jobs_id) {
      updData.timesheet_jobs = {
        connect: {
          id: updData.timesheet_jobs_id,
        },
      };
    }
    delete updData.timesheet_jobs_id;

    if (updData.timesheet_sub_jobs_id) {
      updData.timesheet_sub_jobs = {
        connect: {
          id: updData.timesheet_sub_jobs_id,
        },
      };
      delete updData.timesheet_sub_jobs_id;
    }
    return await this.prisma.time_entry_pending.update({
      where: { id },
      data: updData,
    });
  }

  async remove(id: number) {
    return await this.prisma.time_entry_pending.delete({
      where: {
        id,
      },
    });
  }

  async approveReject(id: number, status: string) {
    if (status == 'APPROVED') {
      let timeEntryPending = await this.prisma.time_entry_pending.findUnique({
        where: {
          id,
        },
      });

      let timesheetEntryUpdData: any = {
        timesheet_clockin_time: timeEntryPending.timesheet_clockin_time,
        timesheet_clockout_time: timeEntryPending.timesheet_clockout_time,
        total_work_in_ms: timeEntryPending.total_work_in_ms,
        total_hours_in_ms: timeEntryPending.total_hours_in_ms,
      };

      let res = await this.prisma.$transaction([
        this.prisma.timesheet_entry.update({
          where: {
            id: timeEntryPending.timesheet_id,
          },
          data: timesheetEntryUpdData,
        }),
        this.prisma.time_entry.update({
          where: { id },
          data: timeEntryPending,
        }),
        this.prisma.time_entry_pending.delete({
          where: { id },
        }),
      ]);
      return res[1];
    } else {
      return await this.prisma.time_entry_pending.delete({
        where: {
          id,
        },
      });
    }
  }
}
