import { Injectable } from '@nestjs/common';
import { CreateTimeEntryInput } from './dto/create-time_entry.input';
import { UpdateTimeEntryInput } from './dto/update-time_entry.input';
import { PrismaService } from 'src/prisma.service';
import { mapIDArrayToEnum } from 'src/common/utils/common_utils';
import { Prisma } from '@prisma/client';
import { QueryTimeEntryInput } from './dto/query-time_entry.input';

@Injectable()
export class TimeEntryService {
  constructor(private prisma: PrismaService) {}

  create(createTimeEntryInput: CreateTimeEntryInput) {
    let insData: any = createTimeEntryInput;
    insData.work_durations = {
      create: {
        user_id: createTimeEntryInput.user_id,
        check_in_time: createTimeEntryInput.check_in_time,
        check_out_time: createTimeEntryInput.check_out_time,
      },
    };

    delete insData.check_in_time && delete insData.check_out_time;

    // insData.timesheet = {
    //   connect: {
    //     id: createTimeEntryInput.timesheet_id,
    //   },
    // };
    delete insData.timesheet_id;

    // insData.org = {
    //   // connect: {
    //   //   id: createTimeEntryInput.org_id,
    //   // },
    // };
    delete insData.org_id;

    insData.created_by = {
      connect: {
        id: createTimeEntryInput.created_by_id,
      },
    };

    insData.user = {
      connect: {
        id: createTimeEntryInput.user_id,
      },
    };
    delete insData.user_id;

    // if (createTimeEntryInput.shift_id) {
    //   insData.shift = {
    //     connect: {
    //       id: createTimeEntryInput.shift_id,
    //     },
    //   };
    //   delete insData.shift_id;
    // }

    return this.prisma.time_entry.create({ data: insData });
  }

  findAll(
    take: number,
    cursor: Prisma.taskWhereUniqueInput | null,
    orgId: number,
    searchText: string | null,
    queryTaskInput: QueryTimeEntryInput | null,
  ) {
    // let filter: any = {
    //   where: {
    //     timesheet_id: queryTaskInput.timesheet_id,
    //     status: {
    //       not: { equals: 'DELETED' },
    //     },
    //   },
    //   // orderBy: {
    //   //   created_at: 'asc',
    //   // },
    //   take,
    //   include: {
    //     user: {
    //       select: {
    //         id: true,
    //         first_name: true,
    //         last_name: true,
    //       },
    //     },
    //   },
    // };
    // if (cursor) {
    //   filter.cursor = cursor;
    //   filter.skip = 1;
    // }
    // return this.prisma.time_entry.findMany(filter);
  }

  findOne(id: number) {
    return `This action returns a #${id} timeEntry`;
  }

  update(id: number, updateTimeEntryInput: UpdateTimeEntryInput) {
    return `This action updates a #${id} timeEntry`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeEntry`;
  }
}
