import { Module } from '@nestjs/common';
import { TaskBoardCustomisationService } from './task_board_customisation.service';
import { TaskBoardCustomisationResolver } from './task_board_customisation.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [
    PrismaService,
    TaskBoardCustomisationResolver,
    TaskBoardCustomisationService,
  ],
})
export class TaskBoardCustomisationModule {}
