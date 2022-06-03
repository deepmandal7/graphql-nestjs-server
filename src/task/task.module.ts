import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { PrismaService } from 'src/prisma.service';
import { TaskBoardCustomisationService } from '../task_board_customisation/task_board_customisation.service';

@Module({
  providers: [
    PrismaService,
    TaskResolver,
    TaskService,
    TaskBoardCustomisationService,
  ],
})
export class TaskModule {}
