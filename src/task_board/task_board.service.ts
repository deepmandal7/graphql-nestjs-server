import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { task_board, Prisma } from '@prisma/client';
import { CreateTaskBoardInput } from './dto/create-task_board.input';
import { UpdateTaskBoardInput } from './dto/update-task_board.input';

@Injectable()
export class TaskBoardService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.task_boardCreateInput) {
    return await this.prisma.task_board.create({ data });
  }

  async findAll(orgId: number) {
    return await this.prisma.task_board.findMany({
      where: {
        org_id: orgId,
        task_board_status: {
          not: 'DELETED',
        },
      },
    });
  }

  async findOne(id: number) {
    return await `This action returns a #${id} taskBoard`;
  }

  async update(id: number, updateTaskBoardInput: UpdateTaskBoardInput) {
    return await this.prisma.task_board.update({
      where: {
        id,
      },
      data: updateTaskBoardInput,
    });
  }

  async remove(id: number) {
    return await this.prisma.task_board.update({
      where: {
        id,
      },
      data: {
        task_board_status: 'DELETED',
      },
    });
  }
}
