import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateTimesheetPayrollSettingInput } from './dto/update-timesheet_payroll_setting.input';

@Injectable()
export class TimesheetPayrollSettingsService {
  constructor(private prisma: PrismaService) {}

  async findOne(timesheetId: number) {
    return await this.prisma.timesheet_payroll_settings.findFirst({
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
    updateTimesheetPayrollSettingInput: UpdateTimesheetPayrollSettingInput,
  ) {
    return await this.prisma.timesheet_general_settings.update({
      where: {
        id,
      },
      data: updateTimesheetPayrollSettingInput,
    });
  }
}
