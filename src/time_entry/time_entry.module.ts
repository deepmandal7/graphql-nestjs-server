import { Module } from '@nestjs/common';
import { TimeEntryService } from './time_entry.service';
import { TimeEntryResolver } from './time_entry.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, TimeEntryResolver, TimeEntryService],
})
export class TimeEntryModule {}
