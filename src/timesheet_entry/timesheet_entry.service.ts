import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTimesheetEntryInput } from './dto/create-timesheet_entry.input';
import { UpdateTimesheetEntryInput } from './dto/update-timesheet_entry.input';

@Injectable()
export class TimesheetEntryService {
  constructor(private prisma: PrismaService) {}

  async create(createTimesheetEntryInput: CreateTimesheetEntryInput) {
    let insData: any = createTimesheetEntryInput;

    let generalSettings =
      await this.prisma.timesheet_general_settings.findFirst({
        select: {
          workweeks: true,
          restrict_clock_in: true,
          restrict_clock_in_to: true,
          restrict_clock_out: true,
          restrict_clock_out_to: true,
        },
        where: {
          timesheets: {
            is: {
              id: createTimesheetEntryInput.timesheet_id,
            },
          },
        },
      });
    if (
      !generalSettings.workweeks[
        new Date(`${insData.entry_date}T00:00:00.000${insData.tz_offset}`)
          .toLocaleString('en-US', {
            timeZone: createTimesheetEntryInput.tz_name,
            weekday: 'long',
          })
          .toLowerCase()
      ]
    ) {
      throw new BadRequestException({
        message: `Day is disabled`,
        error: 'Bad Request',
      });
    }
    if (!createTimesheetEntryInput.time_entry.length) {
      throw new BadRequestException({
        message: `Atleast one Time Entry is required`,
        error: 'Bad Request',
      });
    }

    let totalWorkHours = 0;
    for (let entry of insData.time_entry) {
      entry.check_in_time = new Date(
        `${insData.entry_date}T${entry.check_in_time}:00.000${insData.tz_offset}`,
      );

      switch (entry.check_in_date_type) {
        case 'NEXT':
          entry.check_in_time.setDate(entry.check_in_time.getDate() + 1);
          break;
        case 'PREVIOUS':
          entry.check_in_time.setDate(entry.check_in_time.getDate() - 1);
          break;
      }

      if (entry.check_out_time) {
        entry.check_out_time = new Date(
          `${insData.entry_date}T${entry.check_out_time}:00.000${insData.tz_offset}`,
        );
        switch (entry.check_out_date_type) {
          case 'NEXT':
            entry.check_out_time.setDate(entry.check_out_time.getDate() + 1);
            break;
          case 'PREVIOUS':
            entry.check_out_time.setDate(entry.check_out_time.getDate() - 1);
            break;
        }
      }

      totalWorkHours += entry.check_out_time - entry.check_in_time;
      if (totalWorkHours > 86400000) {
        throw new BadRequestException({
          message: `Time entry(s) exceed 24 hours`,
          error: 'Bad Request',
        });
      }
    }

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
    // console.log(insData);
    // let orderedDates = insData.time_entry.sort(function (a, b) {
    //   return Date.parse(a) > Date.parse(b);
    // });

    // return await this.prisma.timesheet_entry.create({ data: insData });
  }

  findAll() {
    return `This action returns all timesheetEntry`;
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
