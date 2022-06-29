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
      select: {
        id: true,
        task_description: true,
        task_status: true,
        sub_task_start_date_time: true,
        sub_task_end_date_time: true,
        user_ids: { select: { id: true, first_name: true, last_name: true } },
        created_at: true,
        updated_at: true,
        created_by: true,
      },
      where: {
        task_id: taskId,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.sub_task.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        task_description: true,
        task_status: true,
        sub_task_start_date_time: true,
        sub_task_end_date_time: true,
        user_ids: { select: { id: true, first_name: true, last_name: true } },
        created_at: true,
        updated_at: true,
        created_by: true,
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
      select: {
        id: true,
        task_description: true,
        task_status: true,
        sub_task_start_date_time: true,
        sub_task_end_date_time: true,
        created_at: true,
        updated_at: true,
        created_by: true,
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
