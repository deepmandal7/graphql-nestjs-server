import { Module } from '@nestjs/common';
import { TimeEntryPendingService } from './time_entry_pending.service';
import { TimeEntryPendingResolver } from './time_entry_pending.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, TimeEntryPendingResolver, TimeEntryPendingService],
})
export class TimeEntryPendingModule {}
