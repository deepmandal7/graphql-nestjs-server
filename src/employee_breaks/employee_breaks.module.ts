import { Module } from '@nestjs/common';
import { EmployeeBreaksService } from './employee_breaks.service';
import { EmployeeBreaksResolver } from './employee_breaks.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, EmployeeBreaksResolver, EmployeeBreaksService],
})
export class EmployeeBreaksModule {}
