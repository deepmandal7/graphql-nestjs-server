import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateTimesheetCustomizationSettingInput } from './dto/update-timesheet_customization_setting.input';

@Injectable()
export class TimesheetCustomizationSettingsService {
  constructor(private prisma: PrismaService) {}

  async findOne(timesheetId: number) {
    return await this.prisma.timesheet_customization_settings.findFirst({
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
    updateTimesheetCustomizationSettingInput: UpdateTimesheetCustomizationSettingInput,
  ) {
    return await this.prisma.timesheet_customization_settings.update({
      where: {
        id,
      },
      data: updateTimesheetCustomizationSettingInput,
    });
  }
}
