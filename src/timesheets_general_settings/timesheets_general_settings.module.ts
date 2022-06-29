import { Module } from '@nestjs/common';
import { TimesheetsGeneralSettingsService } from './timesheets_general_settings.service';
import { TimesheetsGeneralSettingsResolver } from './timesheets_general_settings.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    PrismaService,
    TimesheetsGeneralSettingsResolver,
    TimesheetsGeneralSettingsService,
  ],
})
export class TimesheetsGeneralSettingsModule {}
