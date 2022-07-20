import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceResolver } from './attendance.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, AttendanceResolver, AttendanceService],
})
export class AttendanceModule {}
