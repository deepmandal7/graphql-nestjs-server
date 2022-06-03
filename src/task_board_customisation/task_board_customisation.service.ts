import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateTaskBoardCustomisationInput } from './dto/create-task_board_customisation.input';
import { UpdateTaskBoardCustomisationInput } from './dto/update-task_board_customisation.input';

@Injectable()
export class TaskBoardCustomisationService {
  constructor(private prisma: PrismaService) {}

  async create(data) {
    return await this.prisma.task_board_customisation.create({ data });
  }

  findAll() {
    return `This action returns all taskBoardCustomisation`;
  }

  async findOne(taskBoardId: number) {
    return await this.prisma.task_board_customisation.findUnique({
      where: {
        task_board_id: taskBoardId,
      },
    });
  }

  update(
    id: number,
    updateTaskBoardCustomisationInput: Prisma.task_board_customisationUpdateInput,
  ) {
    return this.prisma.task_board_customisation.update({
      where: {
        id,
      },
      data: updateTaskBoardCustomisationInput,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} taskBoardCustomisation`;
  }
}
