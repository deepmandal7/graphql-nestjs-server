import { Module } from '@nestjs/common';
import { TaskRepeatDetailsService } from './task_repeat_details.service';
import { TaskRepeatDetailsResolver } from './task_repeat_details.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    PrismaService,
    TaskRepeatDetailsResolver,
    TaskRepeatDetailsService,
  ],
})
export class TaskRepeatDetailsModule {}
