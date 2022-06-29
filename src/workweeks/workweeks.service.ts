import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateWorkweekInput } from './dto/update-workweek.input';

@Injectable()
export class WorkweeksService {
  constructor(private prisma: PrismaService) {}

  async findOne(timesheetId: number) {
    return await this.prisma.workweeks.findFirst({
      where: {
        general_settings: {
          is: {
            timesheets: {
              is: {
                id: timesheetId,
              },
            },
          },
        },
      },
    });
  }

  async update(id: number, updateWorkweekInput: UpdateWorkweekInput) {
    return await this.prisma.workweeks.update({
      where: {
        id,
      },
      data: updateWorkweekInput,
    });
  }
}
