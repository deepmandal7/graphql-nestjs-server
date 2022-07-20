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
                entry.end_time <= entry2.end_time)
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

  update(id: number, updateShiftInput: UpdateShiftInput) {
    return `This action updates a #${id} shift`;
  }

  remove(id: number) {
    return `This action removes a #${id} shift`;
  }
}
