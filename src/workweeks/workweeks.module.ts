import { Module } from '@nestjs/common';
import { WorkweeksService } from './workweeks.service';
import { WorkweeksResolver } from './workweeks.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, WorkweeksResolver, WorkweeksService],
})
export class WorkweeksModule {}
