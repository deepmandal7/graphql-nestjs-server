import { Injectable } from '@nestjs/common';
import { CreateTaskRepeatDetailInput } from './dto/create-task_repeat_detail.input';
import { UpdateTaskRepeatDetailInput } from './dto/update-task_repeat_detail.input';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskRepeatDetailsService {
  constructor(private prisma: PrismaService) {}
  async create(createTaskRepeatDetailInput) {
    return await this.prisma.repeat_details.create({
      data: createTaskRepeatDetailInput,
    });
  }

  async findOne(taskId: number) {
    return await this.prisma.repeat_details.findUnique({
      where: {
        task_id: taskId,
      },
    });
  }

  async update(
    id: number,
    updateTaskRepeatDetailInput: UpdateTaskRepeatDetailInput,
  ) {
    return await this.prisma.repeat_details.update({
      where: {
        id,
      },
      data: updateTaskRepeatDetailInput,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} taskRepeatDetail`;
  }
}
