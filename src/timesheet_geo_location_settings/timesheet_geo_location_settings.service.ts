import { Injectable } from '@nestjs/common';
import { UpdateTimesheetGeoLocationSettingInput } from './dto/update-timesheet_geo_location_setting.input';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TimesheetGeoLocationSettingsService {
  constructor(private prisma: PrismaService) {}

  async findOne(timesheetId: number) {
    return await this.prisma.timesheet_geo_location_settings.findFirst({
      where: {
        timesheets: {
          id: timesheetId,
        },
      },
      select: {
        id: true,
        settings: true,
        breadcrumbs_enabled: true,
        timesheets: {
          select: {
            timesheet_geo_locations: {
              where: { status: 'ACTIVE' },
              select: {
                site_name: true,
                site_address: true,
                jobs: {
                  select: {
                    id: true,
                    job_title: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateTimesheetGeoLocationSettingInput: UpdateTimesheetGeoLocationSettingInput,
  ) {
    return await this.prisma.timesheet_geo_location_settings.update({
      where: {
        id,
      },
      data: updateTimesheetGeoLocationSettingInput,
    });
  }
}
