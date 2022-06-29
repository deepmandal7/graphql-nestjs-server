import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { mapIDArrayToEnum } from 'src/common/utils/common_utils';
import { PrismaService } from 'src/prisma.service';
import { CreateTimesheetJobSettingInput } from './dto/create-timesheet_job_setting.input';
import { QueryTimesheetJobSettingsInput } from './dto/query-timesheet_job_setting.input';
import { UpdateTimesheetJobSettingInput } from './dto/update-timesheet_job_setting.input';

@Injectable()
export class TimesheetJobSettingsService {
  constructor(private prisma: PrismaService) {}

  async create(createTimesheetJobSettingInput: CreateTimesheetJobSettingInput) {
    let insData: any = createTimesheetJobSettingInput;
    insData.timesheets = {
      connect: {
        id: createTimesheetJobSettingInput.timesheets,
      },
    };

    if (createTimesheetJobSettingInput.all_user) {
      delete insData.user;
    } else {
      insData.all_user = false;
      insData.user = {
        connect: mapIDArrayToEnum(createTimesheetJobSettingInput.user),
      };
    }

    if (
      createTimesheetJobSettingInput.geo_locations &&
      createTimesheetJobSettingInput.geo_locations.length
    ) {
      insData.geo_locations = {
        connect: mapIDArrayToEnum(createTimesheetJobSettingInput.geo_locations),
      };
    }

    if (createTimesheetJobSettingInput.sub_jobs_enabled) {
      for (let subJob of insData.timesheet_sub_jobs) {
        if (subJob.all_user) {
          delete subJob.user;
        } else {
          subJob.all_user = false;
          subJob.user = {
            connect: mapIDArrayToEnum(subJob.user),
          };
        }

        subJob.created_by = {
          created_by: {
            connect: createTimesheetJobSettingInput.created_by,
          },
        };
      }

      insData.timesheet_sub_jobs = {
        create: insData.timesheet_sub_jobs,
      };
    }

    insData.created_by = {
      created_by: {
        connect: createTimesheetJobSettingInput.created_by,
      },
    };
    return await this.prisma.timesheet_jobs.create({
      select: {
        id: true,
        job_title: true,
        all_user: true,
        user: true,
        color: true,
        sub_jobs_enabled: true,
        timesheet_sub_jobs: {
          select: {
            id: true,
            sub_job_title: true,
            all_user: true,
            user: true,
          },
        },
        geo_locations: {
          select: {
            site_name: true,
          },
        },
        created_by_id: true,
        created_at: true,
        updated_at: true,
      },
      data: insData,
    });
  }

  async findAll(
    take: number,
    cursor: Prisma.timesheet_jobsWhereUniqueInput | null,
    orgId: number,
    searchText: string | null,
    queryTaskInput: QueryTimesheetJobSettingsInput,
  ) {
    if (searchText)
      return await this.prisma.timesheet_jobs.findMany({
        select: {
          id: true,
          job_title: true,
          timesheet_sub_jobs: {
            select: {
              id: true,
              sub_job_title: true,
            },
          },
        },
        where: {
          timesheets_id: queryTaskInput.timesheet_id,
          OR: [
            {
              job_title: {
                contains: searchText,
              },
            },
            {
              timesheet_sub_jobs: {
                some: {
                  sub_job_title: {
                    contains: searchText,
                  },
                },
              },
            },
          ],
        },
      });
    let filter: any = {
      where: {
        timesheets_id: queryTaskInput.timesheet_id,
        status: {
          equals: 'ACTIVE',
        },
      },
      // orderBy: {
      //   created_at: 'asc',
      // },
      select: {
        id: true,
        job_title: true,
        color: true,
        job_description: true,
        timesheet_sub_jobs: {
          where: { status: { equals: 'ACTIVE' } },
          select: {
            id: true,
            sub_job_title: true,
          },
        },
        geo_locations: {
          where: { status: { equals: 'ACTIVE' } },
          select: {
            id: true,
            site_name: true,
            site_address: true,
          },
        },
        all_user: true,
        user: true,
        created_by_id: true,
        created_at: true,
        updated_at: true,
      },
      take,
    };

    if (cursor) {
      filter.cursor = cursor;
      filter.skip = 1;
    }
    return await this.prisma.timesheet_jobs.findMany(filter);
  }

  async findOne(id: number) {
    return await this.prisma.timesheet_jobs.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        job_title: true,
        all_user: true,
        user: true,
        color: true,
        sub_jobs_enabled: true,
        timesheet_sub_jobs: {
          where: { status: { equals: 'ACTIVE' } },
          select: {
            id: true,
            sub_job_title: true,
            all_user: true,
            user: true,
          },
        },
        geo_locations: {
          where: { status: { equals: 'ACTIVE' } },
          select: {
            site_name: true,
          },
        },
        created_by_id: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async update(
    id: number,
    updateTimesheetJobSettingInput: UpdateTimesheetJobSettingInput,
  ) {
    let updateData: any = updateTimesheetJobSettingInput;

    if (updateTimesheetJobSettingInput.all_user) {
      updateData.user = [];
    } else {
      updateData.all_user = false;
      updateData.user = mapIDArrayToEnum(updateTimesheetJobSettingInput.user);
    }

    return await this.prisma.timesheet_jobs.update({
      where: {
        id,
      },
      data: {
        job_title: updateTimesheetJobSettingInput.job_title,
        color: updateTimesheetJobSettingInput.color,
        job_description: updateTimesheetJobSettingInput.job_description,
        all_user: updateTimesheetJobSettingInput.all_user
          ? updateTimesheetJobSettingInput.all_user
          : false,
        user: {
          set: updateTimesheetJobSettingInput.all_user ? [] : updateData.user,
        },
        sub_jobs_enabled: updateTimesheetJobSettingInput.sub_jobs_enabled,
        geo_locations: {
          set:
            updateTimesheetJobSettingInput.geo_locations &&
            updateTimesheetJobSettingInput.geo_locations.length
              ? mapIDArrayToEnum(updateTimesheetJobSettingInput.geo_locations)
              : [],
        },
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.timesheet_jobs.update({
      where: {
        id,
      },
      data: {
        status: 'DELETED',
      },
    });
  }
}
