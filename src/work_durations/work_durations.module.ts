import { Module } from '@nestjs/common';
import { WorkDurationsService } from './work_durations.service';
import { WorkDurationsResolver } from './work_durations.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, WorkDurationsResolver, WorkDurationsService],
})
export class WorkDurationsModule {}
