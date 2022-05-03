import { Module } from '@nestjs/common';
import { TaskBoardService } from './task_board.service';
import { TaskBoardResolver } from './task_board.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService,TaskBoardResolver, TaskBoardService]
})
export class TaskBoardModule {}
