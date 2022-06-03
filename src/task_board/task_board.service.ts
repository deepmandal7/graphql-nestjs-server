import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { task_board, Prisma } from '@prisma/client';
import { CreateTaskBoardInput } from './dto/create-task_board.input';
import { UpdateTaskBoardInput } from './dto/update-task_board.input';

@Injectable()
export class TaskBoardService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.task_boardCreateInput) {
    return this.prisma.task_board.create({ data });
  }

  findAll() {
    return this.prisma.task_board.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} taskBoard`;
  }

  update(id: number, updateTaskBoardInput: UpdateTaskBoardInput) {
    return `This action updates a #${id} taskBoard`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskBoard`;
  }
}
