import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftsResolver } from './shifts.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, ShiftsResolver, ShiftsService],
})
export class ShiftsModule {}
