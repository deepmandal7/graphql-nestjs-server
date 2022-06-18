import { Module } from '@nestjs/common';
import { TimesheetsService } from './timesheets.service';
import { TimesheetsResolver } from './timesheets.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, TimesheetsResolver, TimesheetsService],
})
export class TimesheetsModule {}
