import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { task, Prisma } from '@prisma/client';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.taskCreateInput) :Promise<task> {
    return await this.prisma.task.create({data})
  }

  async findAll(take: number, cursor: Prisma.taskWhereUniqueInput | null) {
    if (cursor) {
      return await this.prisma.task.findMany({
        include: {
          repeat_details: true
        },
        orderBy: {
          id: 'asc',
        },
        take,
        skip: 1, 
        cursor
      })
    }
    return await this.prisma.task.findMany({
      include: {
        repeat_details: true
      },
      orderBy: {
        id: 'asc',
      },
      take,
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskInput: UpdateTaskInput) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
