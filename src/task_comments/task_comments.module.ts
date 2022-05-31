import { Module } from '@nestjs/common';
import { TaskCommentsService } from './task_comments.service';
import { TaskCommentsResolver } from './task_comments.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, TaskCommentsResolver, TaskCommentsService]
})
export class TaskCommentsModule {}
