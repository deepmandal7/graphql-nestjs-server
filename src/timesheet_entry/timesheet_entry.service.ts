import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTimesheetEntryInput } from './dto/create-timesheet_entry.input';
import { UpdateTimesheetEntryInput } from './dto/update-timesheet_entry.input';
import { Prisma } from '@prisma/client';
import { QueryTimesheetEntryInput } from './dto/query-timesheet_entry.input';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Prague');

@Injectable()
export class TimesheetEntryService {
  constructor(private prisma: PrismaService) {}

  async create(createTimesheetEntryInput: CreateTimesheetEntryInput) {
    let insData: any = createTimesheetEntryInput;

    if (!createTimesheetEntryInput.time_entry.length) {
      throw new BadRequestException({
        message: `Atleast one Time Entry is required`,
        error: 'Bad Request',
      });
    }

    let totalWorkHours = 0;

    for (let entry of insData.time_entry) {
      entry.check_in_time = dayjs(
        `${insData.entry_date} ${entry.check_in_time}`,
      )
        .tz(insData.timezone, true)
        .toDate();

      switch (entry.check_in_day_type) {
        case 'NEXT':
          // dayjs(entry.check_in_time).add(1, 'day');
          entry.check_in_time.setDate(entry.check_in_time.getDate() + 1);
          break;
        case 'PREVIOUS':
          // dayjs(entry.check_in_time).subtract(1, 'day');
          entry.check_in_time.setDate(entry.check_in_time.getDate() - 1);
          break;
      }

      if (entry.check_out_time) {
        entry.check_out_time = dayjs(
          `${insData.entry_date} ${entry.check_out_time}`,
        )
          .tz(insData.timezone, true)
          .toDate();
        switch (entry.check_out_day_type) {
          case 'NEXT':
            // dayjs(entry.check_out_time).add(1, 'day');
            entry.check_out_time.setDate(entry.check_out_time.getDate() + 1);
            break;
          case 'PREVIOUS':
            // dayjs(entry.check_out_time).subtract(1, 'day');
            entry.check_out_time.setDate(entry.check_out_time.getDate() - 1);
            break;
        }

        totalWorkHours += entry.check_out_time - entry.check_in_time;
        if (totalWorkHours > 86400000) {
          throw new BadRequestException({
            message: `Time entry(s) exceed 24 hours`,
            error: 'Bad Request',
          });
        }
      }
    }
    insData.total_work_in_ms = totalWorkHours;

    if (insData.time_entry.length > 1) {
      for (let entry of insData.time_entry) {
        for (let entry2 of insData.time_entry) {
          if (entry != entry2) {
            if (
              (entry.check_in_time >= entry2.check_in_time &&
                entry2.check_out_time &&
                entry.check_in_time <= entry2.check_out_time) ||
              (entry2.check_out_time &&
                entry.check_out_time &&
                entry.check_out_time >= entry2.check_in_time &&
                entry.check_out_time <= entry2.check_out_time)
            ) {
              throw new BadRequestException({
                message: `Time entry(s) overlapped`,
                error: 'Bad Request',
              });
            }
          }
        }
      }
    }

    insData.time_entry = insData.time_entry.sort((entry1, entry2) => {
      return entry1.check_in_time - entry2.check_in_time;
    });

    let { enable_daily_timesheet_approval } =
      await this.prisma.timesheet_general_settings.findFirst({
        select: {
          enable_daily_timesheet_approval: true,
        },
        where: {
          timesheets: {
            is: {
              id: createTimesheetEntryInput.timesheet_id,
            },
          },
        },
      });

    if (!enable_daily_timesheet_approval) {
      insData.status = 'APPROVED';
    }

    insData.timesheet_clockin_time = insData.time_entry[0].check_in_time;
    if (insData.time_entry[insData.time_entry.length - 1].check_out_time) {
      insData.timesheet_clockout_time =
        insData.time_entry[insData.time_entry.length - 1].check_out_time;
      insData.total_hours_in_ms =
        insData.timesheet_clockout_time - insData.timesheet_clockin_time;
    }

    insData.timesheet = {
      connect: {
        id: insData.timesheet_id,
      },
    };
    delete insData.timesheet_id;
    insData.user = {
      connect: {
        id: insData.user_id,
      },
    };
    delete insData.user_id;
    insData.created_by = {
      connect: {
        id: insData.created_by_id,
      },
    };
    delete insData.created_by_id;

    insData.time_entry = {
      create: insData.time_entry.map((timeEntry) => {
        let entry: any = {
          created_by: {
            connect: {
              id: timeEntry.created_by_id,
            },
          },
          check_in_time: timeEntry.check_in_time,
          check_in_day_type: timeEntry.check_in_day_type,
          check_out_time: timeEntry.check_out_time,
          check_out_day_type: timeEntry.check_out_day_type,
        };
        if (entry.timesheet_jobs_id) {
          entry.timesheet_jobs = {
            connect: {
              id: entry.timesheet_jobs_id,
            },
          };
          delete entry.timesheet_jobs_id;
        }
        if (entry.timesheet_sub_jobs_id) {
          entry.timesheet_sub_jobs = {
            connect: {
              id: entry.timesheet_sub_jobs_id,
            },
          };
          delete entry.timesheet_sub_jobs_id;
        }
        return entry;
      }),
    };
    let { is_enabled, break_configuration } =
      await this.prisma.timesheet_break_settings.findFirst({
        select: {
          is_enabled: true,
          break_configuration: true,
        },
        where: {
          timesheets: {
            is: {
              id: createTimesheetEntryInput.timesheet_id,
            },
          },
        },
      });
    if (is_enabled && break_configuration == 'MANUAL') {
      let totalBreakHours = 0;
      if (insData.employee_break && insData.employee_break.length) {
        for (let entry of insData.employee_break) {
          entry.start_time = dayjs(`${insData.entry_date} ${entry.start_time}`)
            .tz(insData.timezone, true)
            .toDate();
          switch (entry.start_day_type) {
            case 'NEXT':
              // dayjs(entry.check_in_time).add(1, 'day');
              entry.start_time.setDate(entry.start_time.getDate() + 1);
              break;
            case 'PREVIOUS':
              // dayjs(entry.check_in_time).subtract(1, 'day');
              entry.start_time.setDate(entry.start_time.getDate() - 1);
              break;
          }

          if (entry.end_time) {
            entry.end_time = dayjs(`${insData.entry_date} ${entry.end_time}`)
              .tz(insData.timezone, true)
              .toDate();
            switch (entry.end_day_type) {
              case 'NEXT':
                // dayjs(entry.check_out_time).add(1, 'day');
                entry.end_time.setDate(entry.end_time.getDate() + 1);
                break;
              case 'PREVIOUS':
                // dayjs(entry.check_out_time).subtract(1, 'day');
                entry.end_time.setDate(entry.end_time.getDate() - 1);
                break;
            }

            totalBreakHours += entry.end_time - entry.start_time;
            if (totalBreakHours > 86400000) {
              throw new BadRequestException({
                message: `Break(s) exceed 24 hours`,
                error: 'Bad Request',
              });
            }
          }
        }
      }
      if (insData.employee_break && insData.employee_break.length > 1) {
        for (let entry of insData.employee_break) {
          for (let entry2 of insData.employee_break) {
            if (entry != entry2) {
              if (
                (entry.start_time >= entry2.start_time &&
                  entry2.end_time &&
                  entry.start_time <= entry2.end_time) ||
                (entry2.end_time &&
                  entry.end_time &&
                  entry.end_time >= entry2.start_time &&
                  entry.end_time <= entry2.end_time)
              ) {
                throw new BadRequestException({
                  message: `Breaks(s) overlapped`,
                  error: 'Bad Request',
                });
              }
            }
          }
        }
      }
      if (insData.employee_break && insData.employee_break.length)
        insData.employee_break = {
          create: insData.employee_break.map((entry) => {
            let employeeBreak: any = entry;
            employeeBreak.timesheet_manual_breaks = {
              connect: {
                id: entry.timesheet_manual_breaks_id,
              },
            };
            delete employeeBreak.timesheet_manual_breaks_id;
            return employeeBreak;
          }),
        };
    }
    insData.entry_date = new Date(
      insData.entry_date.split('-')[0],
      +insData.entry_date.split('-')[1] - 1,
      insData.entry_date.split('-')[2],
    );
    delete insData.timezone;
    return await this.prisma.timesheet_entry.create({ data: insData });

    // let dayName = insData.time_entry[0].check_in_time
    //   .toLocaleString('en-US', {
    //     timeZone: generalSettings.timezone,
    //     weekday: 'long',
    //   })
    //   .toLowerCase();
    // if (!generalSettings.workweeks[dayName]) {
    //   throw new BadRequestException({
    //     message: `Day is disabled`,
    //     error: 'Bad Request',
    //   });
    // }

    // if (generalSettings.restrict_clock_in) {
    //   let currentDate = new Date();
    //   let actualClockInTimeArray =
    //     generalSettings.workweeks[`${dayName}_start_time`].split(':');

    //   let actualClockInTime = new Date(
    //     currentDate.getFullYear(),
    //     currentDate.getMonth(),
    //     currentDate.getDay(),
    //     +actualClockInTimeArray[0],
    //     +actualClockInTimeArray[1],
    //   );
    //   // let restrictedClockinTime = actualClockInTime.set;
    // }

    // // if (generalSettings.restrict_clock_in) {
    // let firstClockinTime = insData.time_entry[0].check_in_time
    //   .toLocaleString('en-GB', {
    //     timeZone: generalSettings.timezone,
    //   })
    //   .split(',')[1]
    //   .trim();

    // let firstClockinTimeInMinutes =
    //   +firstClockinTime.split(':')[0] * 60 + +firstClockinTime.split(':')[1];
    // let clockinTime =
    //   generalSettings.workweeks[`${dayName}_start_time`] + ':00';
    // let clockinTimeInMinutes =
    //   +clockinTime.split(':')[0] * 60 + +clockinTime.split(':')[1];
    // // let restrictedClockinTime = `${
    // //   generalSettings.workweeks[`${dayName}_start_time`]
    // // }:${generalSettings.restrict_clock_in_to}:00`;
    // // if (firstClockinTime.split(':')[0]) {
    // // }
    // console.log(firstClockinTime);
    // console.log(firstClockinTimeInMinutes);
    // console.log(clockinTime);
    // console.log(clockinTimeInMinutes);

    // console.log(restrictedClockinTime);
    // }
    // console.log(
    //   new Date(`${insData.entry_date}T00:00:00.000${insData.tz_offset}`),
    //   ' ----- ',
    //   `${insData.entry_date}T00:00:00.000${insData.tz_offset}`,
    //   ` ----- `,
    //   new Date(
    //     `${insData.entry_date}T00:00:00.000${insData.tz_offset}`,
    //   ).toLocaleString('en-US', {
    //     timeZone: generalSettings.timezone,
    //   }),
    // );
    // let dayName = new Date(
    //   `${insData.entry_date}T00:00:00.000${insData.tz_offset}`,
    // )
    //   .toLocaleString('en-US', {
    //     timeZone: generalSettings.timezone,
    //     weekday: 'long',
    //   })
    //   .toLowerCase();

    // if (!generalSettings.workweeks[dayName]) {
    //   throw new BadRequestException({
    //     message: `Day is disabled`,
    //     error: 'Bad Request',
    //   });
    // }

    // // console.log(
    // //   'working',
    // //   new Date(
    // //     `${insData.entry_date}T00:00:00.000${insData.tz_offset}`,
    // //   ).toLocaleString('en-US', {
    // //     timeZone: generalSettings.timezone,
    // //   }),
    // // );

    // let firstClockin = new Date(
    //   `${insData.entry_date}T${insData.time_entry[0].check_in_time}:00.000${insData.tz_offset}`,
    // );
    // let actualClockInTime = `${insData.entry_date}T${
    //   generalSettings.workweeks[`${dayName}_start_time`]
    // }:00.000${insData.tz_offset}`;

    // // for (let entry of insData.time_entry) {
    // //   if ()
    // // }

    // // if (generalSettings.restrict_clock_in) {

    // // }
    // console.log(actualClockInTime);

    // return await this.prisma.timesheet_entry.create({ data: insData });
  }

  async findAll(
    take: number,
    cursor: Prisma.timesheet_entryWhereUniqueInput | null,
    orgId: number,
    searchText: string | null,
    queryTimesheetEntryInput: QueryTimesheetEntryInput | null,
  ) {
    let filter: any = {
      where: { timesheet_id: queryTimesheetEntryInput.timesheetId },
      take,
      select: {
        id: true,
        status: true,
        user: {
          select: {
            id: true,
          },
        },
        entry_date: true,
        timesheet_clockin_time: true,
        timesheet_clockout_time: true,
        total_work_in_ms: true,
        created_at: true,
        updated_at: true,
        created_by: true,
      },
    };

    if (cursor) {
      filter.cursor = cursor;
      filter.skip = 1;
    }

    if (queryTimesheetEntryInput.date1 && queryTimesheetEntryInput.date2) {
      filter.where.entry_date = {
        gte: dayjs(queryTimesheetEntryInput.date1).toDate(),
        lte: dayjs(queryTimesheetEntryInput.date2).toDate(),
      };
    } else if (queryTimesheetEntryInput.date1) {
      let date2 = new Date(queryTimesheetEntryInput.date1);

      date2.setDate(date2.getDate() + 1);
      filter.where.entry_date = {
        gte: dayjs(queryTimesheetEntryInput.date1).toDate(),
        lte: date2.toISOString(),
      };
    }
    if (queryTimesheetEntryInput.userId) {
      filter.where.user_id = queryTimesheetEntryInput.userId;
      filter.select.time_entry = true;
      filter.select.employee_break = true;
    }
    if (queryTimesheetEntryInput.status) {
      filter.where.status = queryTimesheetEntryInput.status;
    } else {
      filter.where.status = { not: 'DELETED' };
    }
    return await this.prisma.timesheet_entry.findMany(filter);
  }

  async findOne(id: number) {
    return await this.prisma.timesheet_entry.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        status: true,
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        entry_date: true,
        timesheet_clockin_time: true,
        timesheet_clockout_time: true,
        total_work_in_ms: true,
        created_at: true,
        updated_at: true,
        created_by: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        time_entry: {
          where: {
            status: {
              not: 'DELETED',
            },
          },
        },
        employee_break: {
          where: {
            status: {
              not: 'DELETED',
            },
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateTimesheetEntryInput: UpdateTimesheetEntryInput,
  ) {
    let updData: any = {};
    if (updateTimesheetEntryInput.status) {
      updData.status = updateTimesheetEntryInput.status;
    } else if (updateTimesheetEntryInput.entry_date) {
      updData.entry_date = new Date(
        +updateTimesheetEntryInput.entry_date.split('-')[0],
        +updateTimesheetEntryInput.entry_date.split('-')[1],
        +updateTimesheetEntryInput.entry_date.split('-')[2],
      );
    }
    return await this.prisma.timesheet_entry.update({
      where: {
        id,
      },
      data: updData,
    });
  }

  async remove(id: number) {
    return await this.prisma.timesheet_entry.update({
      where: {
        id,
      },
      data: {
        status: 'DELETED',
      },
    });
  }
}
