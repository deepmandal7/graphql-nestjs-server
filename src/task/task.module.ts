import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, TaskResolver, TaskService]
})
export class TaskModule {}
