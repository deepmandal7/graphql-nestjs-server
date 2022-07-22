import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateShiftInput } from './dto/create-shift.input';
import { UpdateShiftInput } from './dto/update-shift.input';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Prague');

@Injectable()
export class ShiftsService {
  constructor(private prisma: PrismaService) {}

  async create(createShiftInput: CreateShiftInput[]) {
    if (!createShiftInput.length) {
      throw new BadRequestException({
        message: `Atleast one Time Entry is required`,
        error: 'Bad Request',
      });
    }
    let insData: any = createShiftInput;
    let totalWorkHours = 0;
    for (let entry of insData) {
      entry.start_time = dayjs(`${entry.start_date} ${entry.start_time}`)
        .tz(entry.timezone, true)
        .toDate();
      if (entry.end_date) {
        entry.end_time = dayjs(`${entry.end_date} ${entry.end_time}`)
          .tz(entry.timezone, true)
          .toDate();

        totalWorkHours += entry.end_time - entry.start_time;
        if (totalWorkHours > 86400000) {
          throw new BadRequestException({
            message: `Time exceed 24 hours`,
            error: 'Bad Request',
          });
        }
      }
      delete entry.start_date;
      delete entry.end_date;
      let shiftCheck = await this.prisma.shift.findFirst({
        where: {
          timesheet_id: entry.timesheet_id,
          status: null,
          user_id: {
            equals: entry.user_id,
          },
          OR: [
            {
              start_time: {
                gte: entry.start_time,
                lte: entry.end_time,
              },
            },
            {
              end_time: {
                lte: entry.end_time,
                gte: entry.start_time,
              },
            },
            {
              AND: [
                {
                  start_time: {
                    gte: entry.start_time,
                  },
                },
                {
                  end_time: {
                    lte: entry.end_time,
                  },
                },
              ],
            },
          ],
        },
      });
      if (shiftCheck) {
        throw new BadRequestException({
          message: `Shift already exists on given time duration(s)`,
          error: 'Bad Request',
        });
      }

      entry.timesheet = {
        connect: {
          id: entry.timesheet_id,
        },
      };
      delete insData.timesheet_id;
      entry.created_by = {
        connect: {
          id: entry.created_by_id,
        },
      };
      delete insData.created_by_id;
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
    }
    if (insData.length > 1) {
      for (let entry of insData) {
        for (let entry2 of insData) {
          if (entry != entry2) {
            if (
              (entry.start_time >= entry2.start_time &&
                entry2.end_time &&
                entry.start_time <= entry2.end_time) ||
              (entry2.end_time &&
                entry.end_time &&
                entry.end_time >= entry2.start_time &&
                entry.end_time <= entry2.end_time) ||
              (entry.start_time <= entry2.start_time &&
                entry.end_time >= entry2.end_time)
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

    return await this.prisma.shift.createMany({
      data: insData,
    });
  }

  async update(id: number, updateShiftInput: UpdateShiftInput) {
    let updData: any = updateShiftInput;
    delete updData.id;
    updData.start_time = dayjs(`${updData.start_date} ${updData.start_time}`)
      .tz(updData.timezone, true)
      .toDate();
    let totalWorkHours = 0;
    if (updData.end_date) {
      updData.end_time = dayjs(`${updData.end_date} ${updData.end_time}`)
        .tz(updData.timezone, true)
        .toDate();

      totalWorkHours += updData.end_time - updData.start_time;
      if (totalWorkHours > 86400000) {
        throw new BadRequestException({
          message: `Time exceed 24 hours`,
          error: 'Bad Request',
        });
      }
    }
    delete updData.start_date;
    delete updData.end_date;
    let shiftCheck = await this.prisma.shift.findFirst({
      where: {
        timesheet_id: updData.timesheet_id,
        status: null,
        user_id: {
          equals: updData.user_id,
        },
        OR: [
          {
            start_time: {
              gte: updData.start_time,
              lte: updData.end_time,
            },
          },
          {
            end_time: {
              lte: updData.end_time,
              gte: updData.start_time,
            },
          },
          {
            AND: [
              {
                start_time: {
                  gte: updData.start_time,
                },
              },
              {
                end_time: {
                  lte: updData.end_time,
                },
              },
            ],
          },
        ],
      },
    });
    if (shiftCheck) {
      throw new BadRequestException({
        message: `Shift already exists on given time duration(s)`,
        error: 'Bad Request',
      });
    }
    if (updData.timesheet_jobs_id) {
      updData.timesheet_jobs = {
        connect: {
          id: updData.timesheet_jobs_id,
        },
      };
      delete updData.timesheet_jobs_id;
    }
    if (updData.timesheet_sub_jobs_id) {
      updData.timesheet_sub_jobs = {
        connect: {
          id: updData.timesheet_sub_jobs_id,
        },
      };
      delete updData.timesheet_sub_jobs_id;
    }
    delete updData.user_id;
    delete updData.timesheet_id;
    return this.prisma.shift.update({
      where: {
        id,
      },
      data: updData,
    });
  }

  async remove(id: number) {
    return await this.prisma.shift.update({
      where: {
        id,
      },
      data: {
        status: 'DELETED',
      },
    });
  }
}
