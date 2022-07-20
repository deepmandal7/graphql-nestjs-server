import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateTimeOffInput } from './dto/create-time_off.input';
import { QueryTimeOffInput } from './dto/query_time-off.input';
import { UpdateTimeOffInput } from './dto/update-time_off.input';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Prague');

@Injectable()
export class TimeOffsService {
  constructor(private prisma: PrismaService) {}

  async create(createTimeOffInput: CreateTimeOffInput) {
    let insData: any = createTimeOffInput;
    if (createTimeOffInput.leave_type_enum == 'PARTIAL') {
      insData.from_time = dayjs(
        `${createTimeOffInput.from_date} ${createTimeOffInput.from_time}`,
      )
        .tz(createTimeOffInput.timezone, true)
        .toDate();

      insData.to_time = dayjs(
        `${createTimeOffInput.to_date} ${createTimeOffInput.to_time}`,
      )
        .tz(createTimeOffInput.timezone, true)
        .toDate();
      insData.from_date = new Date(
        +insData.from_date.split('-')[0],
        +insData.from_date.split('-')[1] - 1,
        +insData.from_date.split('-')[2],
      );
    } else {
      insData.from_date = new Date(
        +insData.from_date.split('-')[0],
        +insData.from_date.split('-')[1] - 1,
        +insData.from_date.split('-')[2],
      );
      insData.to_date = new Date(
        +insData.to_date.split('-')[0],
        +insData.to_date.split('-')[1] - 1,
        +insData.to_date.split('-')[2],
      );
    }
    return await this.prisma.time_off.create({
      data: createTimeOffInput,
    });
  }

  async findAll(
    take: number,
    cursor: Prisma.time_offWhereUniqueInput | null,
    queryTimeOffInput: QueryTimeOffInput,
    orgId: number,
    searchText: string | null,
  ) {
    let filter: any = queryTimeOffInput;
    return await this.prisma.time_off.findMany({
      take,
      where: {
        ...filter,
        status: {
          not: 'DELETED',
        },
      },
      select: {
        id: true,
        time_off_type: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        leave_type_enum: true,
        from_date: true,
        to_date: true,
        from_time: true,
        to_time: true,
        reason: true,
        status: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.time_off.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        time_off_type: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        leave_type_enum: true,
        from_date: true,
        to_date: true,
        from_time: true,
        to_time: true,
        reason: true,
        status: true,
      },
    });
  }

  async update(id: number, updateTimeOffInput: UpdateTimeOffInput) {
    let updData: any = updateTimeOffInput;
    delete updData.id;
    if (updateTimeOffInput.leave_type_enum == 'PARTIAL') {
      updData.from_time = dayjs(
        `${updateTimeOffInput.from_date} ${updateTimeOffInput.from_time}`,
      )
        .tz(updateTimeOffInput.timezone, true)
        .toDate();

      updData.to_time = dayjs(
        `${updateTimeOffInput.to_date} ${updateTimeOffInput.to_time}`,
      )
        .tz(updateTimeOffInput.timezone, true)
        .toDate();
    } else {
      updData.from_date = new Date(
        +updData.from_date.split('-')[0],
        +updData.from_date.split('-')[1] - 1,
        +updData.from_date.split('-')[2],
      );
      updData.to_date = new Date(
        +updData.to_date.split('-')[0],
        +updData.to_date.split('-')[1] - 1,
        +updData.to_date.split('-')[2],
      );
      delete updData.from_time && delete updData.to_time;
    }
    return await this.prisma.time_off.update({
      where: {
        id,
      },
      data: updData,
    });
  }

  async remove(id: number) {
    return await this.prisma.time_off.update({
      where: {
        id,
      },
      data: {
        status: 'DELETED',
      },
    });
  }
}
