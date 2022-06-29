import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { UpdateTimesheetNotificationSettingInput } from './dto/update-timesheet_notification_setting.input';

@Injectable()
export class TimesheetNotificationSettingsService {
  constructor(private prisma: PrismaService) {}

  async findOne(timesheetId: number) {
    return await this.prisma.timesheet_notification_settings.findFirst({
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
    updateTimesheetNotificationSettingInput: UpdateTimesheetNotificationSettingInput,
  ) {
    return await this.prisma.timesheet_customization_settings.update({
      where: {
        id,
      },
      data: updateTimesheetNotificationSettingInput,
    });
  }
}
