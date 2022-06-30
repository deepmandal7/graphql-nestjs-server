import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTimesheetEntryInput } from './dto/create-timesheet_entry.input';
import { UpdateTimesheetEntryInput } from './dto/update-timesheet_entry.input';
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

      switch (entry.check_in_date_type) {
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
        switch (entry.check_out_date_type) {
          case 'NEXT':
            // console.log('before ---', entry.check_out_time);
            // dayjs(entry.check_out_time).add(1, 'day');
            // console.log('after ---', entry.check_out_time);
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
    // console.log(insData);

    if (insData.time_entry.length > 1) {
      for (let entry of insData.time_entry) {
        for (let entry2 of insData.time_entry) {
          if (entry != entry2) {
            if (
              (entry.check_in_time > entry2.check_in_time &&
                entry.check_in_time < entry2.check_out_time) ||
              (entry.check_out_time > entry2.check_in_time &&
                entry.check_out_time < entry2.check_out_time)
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

    if (enable_daily_timesheet_approval) {
      insData.status = 'PENDING';
    }

    insData.timesheet_clockin_time = insData.time_entry[0].check_in_time;
    insData.timesheet_clockout_time =
      insData.time_entry[insData.time_entry.length - 1].check_out_time;

    insData.time_entry = insData.time_entry = {
      create: insData.time_entry.map((timeEntry) => timeEntry),
    };
    console.log(insData.time_entry);
    delete insData.entry_date;
    delete insData.timezone;

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

    insData.time_entry = insData.time_entry.map((timeEntry) => {
      return {
        user: {
          connect: {
            id: timeEntry.user_id,
          },
        },
        created_by: {
          connect: {
            id: timeEntry.created_by_id,
          },
        },
      };
    });

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

    return await this.prisma.timesheet_entry.create({ data: insData });
  }

  async findAll() {
    return this.prisma;
  }

  findOne(id: number) {
    return `This action returns a #${id} timesheetEntry`;
  }

  update(id: number, updateTimesheetEntryInput: UpdateTimesheetEntryInput) {
    return `This action updates a #${id} timesheetEntry`;
  }

  remove(id: number) {
    return `This action removes a #${id} timesheetEntry`;
  }
}
