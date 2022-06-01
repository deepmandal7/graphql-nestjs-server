import { Module } from '@nestjs/common';
import { TimeclockService } from './timeclock.service';
import { TimeclockResolver } from './timeclock.resolver';

@Module({
  providers: [TimeclockResolver, TimeclockService]
})
export class TimeclockModule {}
