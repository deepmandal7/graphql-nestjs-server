import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateTimesheetsGeneralSettingInput } from './dto/update-timesheets_general_setting.input';

@Injectable()
export class TimesheetsGeneralSettingsService {
  constructor(private prisma: PrismaService) {}

  async findOne(timesheetId: number) {
    return await this.prisma.timesheet_general_settings.findFirst({
      where: {
        timesheets: {
          is: {
            id: timesheetId,
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateTimesheetsGeneralSettingInput: UpdateTimesheetsGeneralSettingInput,
  ) {
    return await this.prisma.timesheet_general_settings.update({
      where: {
        id,
      },
      data: updateTimesheetsGeneralSettingInput,
    });
  }
}
