import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { task, Prisma } from '@prisma/client';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TaskService {

  constructor(private prisma: PrismaService) {}

  create(data: Prisma.taskCreateInput) {
    return this.prisma.task.create({data});
  }

  findAll() {
    return `This action returns all task`;
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
