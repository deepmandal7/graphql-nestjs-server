import { Module } from '@nestjs/common';
import { RepeatDetailsService } from './repeat_details.service'
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService, RepeatDetailsService],
  exports: [RepeatDetailsService]
})
export class RepeatDetailsModule {}


