import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, JobsResolver, JobsService]
})
export class JobsModule {}
