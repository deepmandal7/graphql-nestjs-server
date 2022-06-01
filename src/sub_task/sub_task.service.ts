import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateSubTaskInput } from './dto/create-sub_task.input';
import { UpdateSubTaskInput } from './dto/update-sub_task.input';

@Injectable()
export class SubTaskService {
  constructor(private prisma: PrismaService) {}
  create(data: Prisma.sub_taskCreateInput) {
    return this.prisma.sub_task.create({ data });
  }
  findAll() {
    return `This action returns all subTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subTask`;
  }

  async findUserSubTasks(userId: number) {
    return await this.prisma.sub_task.findMany({
      where: {
        user_ids: {
          some: {
            id: {
              equals: userId,
            },
          },
        },
      },
    });
  }

  update(id: number, data: Prisma.sub_taskUpdateInput) {
    return this.prisma.sub_task.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} subTask`;
  }
}
