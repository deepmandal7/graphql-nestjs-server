import { Module } from '@nestjs/common';
import { EmployeeBreakPendingService } from './employee_break_pending.service';
import { EmployeeBreakPendingResolver } from './employee_break_pending.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    PrismaService,
    EmployeeBreakPendingResolver,
    EmployeeBreakPendingService,
  ],
})
export class EmployeeBreakPendingModule {}
