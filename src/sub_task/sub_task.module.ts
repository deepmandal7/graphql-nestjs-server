import { Module } from '@nestjs/common';
import { SubTaskService } from './sub_task.service';
import { SubTaskResolver } from './sub_task.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, SubTaskResolver, SubTaskService],
})
export class SubTaskModule {}
