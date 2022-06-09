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
  findAll(taskId: number) {
    return this.prisma.sub_task.findMany({
      where: {
        task_id: taskId,
      },
      include: {
        user_ids: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.sub_task.findUnique({
      where: {
        id,
      },
      include: {
        user_ids: true,
      },
    });
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
    return this.prisma.sub_task.update({
      where: {
        id,
      },
      data: {
        task_status: 'DELETED',
      },
    });
  }
}
