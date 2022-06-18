import { Injectable } from '@nestjs/common';
import { CreateTimeEntryInput } from './dto/create-time_entry.input';
import { UpdateTimeEntryInput } from './dto/update-time_entry.input';
import { PrismaService } from 'src/prisma.service';
import { mapIDArrayToEnum } from 'src/common/utils/common_utils';

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

    insData.org = {
      connect: {
        id: createTimeEntryInput.org_id,
      },
    };

    insData.user = {
      connect: {
        id: createTimeEntryInput.user_id,
      },
    };

    if (createTimeEntryInput.shift_id) {
      insData.shift = {
        connect: createTimeEntryInput.shift_id,
      };
    }

    if (createTimeEntryInput.employee_break.length) {
      insData.employee_break = {
        connect: mapIDArrayToEnum(createTimeEntryInput.employee_break),
      };
    }

    return this.prisma.time_entry.create({ data: insData });
  }

  findAll() {
    return `This action returns all timeEntry`;
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
