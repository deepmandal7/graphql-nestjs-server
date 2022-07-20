import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { mapIDArrayToEnum } from 'src/common/utils/common_utils';
import { PrismaService } from 'src/prisma.service';
import { CreateTimeOffTypeInput } from './dto/create-time_off_type.input';
import { QueryTimeOffTypeInput } from './dto/query-time_off_type.input';
import { UpdateTimeOffTypeInput } from './dto/update-time_off_type.input';

@Injectable()
export class TimeOffTypeService {
  constructor(private prisma: PrismaService) {}

  async create(createTimeOffTypeInput: CreateTimeOffTypeInput) {
    let insData: any = createTimeOffTypeInput;
    if (createTimeOffTypeInput.user && createTimeOffTypeInput.user.length) {
      insData.user = {
        connect: mapIDArrayToEnum(insData.user),
      };
      insData.all_user = false;
    } else {
      insData.all_user = true;
    }
    return await this.prisma.time_off_type.create({
      data: insData,
    });
  }

  async findAll(
    take: number,
    cursor: Prisma.time_off_typeWhereUniqueInput | null,
    queryTimeOffTypeInput: QueryTimeOffTypeInput,
    orgId: number,
    searchText: string | null,
  ) {
    let filter: any = {
      take,
      where: {
        status: 'ACTIVE',
        org_id: orgId,
      },
      select: {
        id: true,
        name: true,
        unit: true,
        paid: true,
        is_enabled: true,
        all_user: true,
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    };

    if (cursor) {
      filter.cursor = cursor;
      filter.skip = 1;
    }
    if (filter.user_id) {
      filter.user = {
        some: {
          id: filter.user_id,
        },
      };
      delete filter.user_id;
    }
    return await this.prisma.time_off_type.findMany(filter);
  }
  async update(id: number, updateTimeOffTypeInput: UpdateTimeOffTypeInput) {
    let updData: any = updateTimeOffTypeInput;
    if (updateTimeOffTypeInput.user && updateTimeOffTypeInput.user.length) {
      updData.user = {
        connect: mapIDArrayToEnum(updData.user),
      };
      updData.all_user = false;
    } else {
      updData.all_user = true;
    }
    return await this.prisma.time_off_type.update({
      where: {
        id,
      },
      data: updData,
    });
  }

  async remove(id: number) {
    return await this.prisma.time_off_type.update({
      where: {
        id,
      },
      data: {
        status: 'DELETED',
      },
    });
  }
}
