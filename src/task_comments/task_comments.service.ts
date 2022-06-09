import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTaskCommentInput } from './dto/create-task_comment.input';
import { UpdateTaskCommentInput } from './dto/update-task_comment.input';
import { task_comments, Prisma } from '@prisma/client';

@Injectable()
export class TaskCommentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.task_commentsCreateInput): Promise<task_comments> {
    return await this.prisma.task_comments.create({ data });
  }

  async findAll(
    filter: Prisma.task_commentsFindManyArgs,
  ): Promise<task_comments[]> {
    return await this.prisma.task_comments.findMany(filter);
  }

  async findOne(
    filter: Prisma.task_commentsWhereUniqueInput,
  ): Promise<task_comments> {
    return await this.prisma.task_comments.findUnique({
      where: {
        id: filter.id,
      },
    });
  }

  async update(
    id: number,
    updateTaskCommentInput: Prisma.task_commentsUpdateInput,
  ): Promise<task_comments> {
    return await this.prisma.task_comments.update({
      where: {
        id,
      },
      data: {
        comment: updateTaskCommentInput.comment,
      },
    });
  }

  async remove(id: number): Promise<task_comments> {
    return await this.prisma.task_comments.update({
      where: {
        id,
      },
      data: {
        task_comments_status: 'DELETED',
      },
    });
  }
}
