import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateTimesheetReminderSettingInput } from './dto/update-timesheet_reminder_setting.input';

@Injectable()
export class TimesheetReminderSettingsService {
  constructor(private prisma: PrismaService) {}

  async findOne(timesheetId: number) {
    return await this.prisma.timesheet_reminder_settings.findFirst({
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
    updateTimesheetReminderSettingInput: UpdateTimesheetReminderSettingInput,
  ) {
    return await this.prisma.timesheet_reminder_settings.update({
      where: {
        id,
      },
      data: updateTimesheetReminderSettingInput,
    });
  }
}
