import { Module } from '@nestjs/common';
import { TimeOffsService } from './time_offs.service';
import { TimeOffsResolver } from './time_offs.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, TimeOffsResolver, TimeOffsService],
})
export class TimeOffsModule {}
