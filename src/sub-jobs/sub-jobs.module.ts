import { Module } from '@nestjs/common';
import { SubJobsService } from './sub-jobs.service';
import { SubJobsResolver } from './sub-jobs.resolver';

@Module({
  providers: [SubJobsResolver, SubJobsService]
})
export class SubJobsModule {}
