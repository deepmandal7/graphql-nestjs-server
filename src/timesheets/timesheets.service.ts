import { Injectable } from '@nestjs/common';
import { CreateTimesheetInput } from './dto/create-timesheet.input';
import { UpdateTimesheetInput } from './dto/update-timesheet.input';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import {
  digitsToDateTime,
  digitsToDate,
  coordinatesStringToArray,
  mapIDArrayToEnum,
} from '../common/utils/common_utils';

@Injectable()
export class TimesheetsService {
  constructor(private prisma: PrismaService) {}

  async create(createTimesheetInput: CreateTimesheetInput) {
    let insertData: any = createTimesheetInput;

    insertData.org = {
      connect: { id: insertData.org },
    };
    insertData.created_by = {
      connect: { id: insertData.created_by },
    };
    return await this.prisma.timesheets.create({
      data: insertData,
    });
  }

  async findAll(orgId: number) {
    return await this.prisma.timesheets.findMany({
      where: {
        org_id: orgId,
      },
      include: {
        admins: {
          select: {
            email_id: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} timesheet`;
  }

  update(id: number, updateTimesheetInput: UpdateTimesheetInput) {
    return `This action updates a #${id} timesheet`;
  }

  remove(id: number) {
    return `This action removes a #${id} timesheet`;
  }
}
