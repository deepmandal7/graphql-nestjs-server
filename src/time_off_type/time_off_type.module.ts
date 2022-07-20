import { Module } from '@nestjs/common';
import { TimeOffTypeService } from './time_off_type.service';
import { TimeOffTypeResolver } from './time_off_type.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, TimeOffTypeResolver, TimeOffTypeService],
})
export class TimeOffTypeModule {}
