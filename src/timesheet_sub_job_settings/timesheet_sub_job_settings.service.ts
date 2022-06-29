import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { mapIDArrayToEnum } from 'src/common/utils/common_utils';
import { PrismaService } from 'src/prisma.service';
import { CreateTimesheetSubJobSettingInput } from './dto/create-timesheet_sub_job_setting.input';
import { UpdateTimesheetSubJobSettingInput } from './dto/update-timesheet_sub_job_setting.input';

@Injectable()
export class TimesheetSubJobSettingsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createTimesheetSubJobSettingInput: CreateTimesheetSubJobSettingInput,
  ) {
    let subJobsEnabled = await this.prisma.timesheet_jobs.findUnique({
      where: {
        id: createTimesheetSubJobSettingInput.job_id,
      },
      select: {
        sub_jobs_enabled: true,
      },
    });
    if (subJobsEnabled.sub_jobs_enabled) {
      let insData: any = createTimesheetSubJobSettingInput;

      if (createTimesheetSubJobSettingInput.all_user) {
        delete insData.user;
      } else {
        insData.all_user = false;
        insData.user = {
          connect: mapIDArrayToEnum(createTimesheetSubJobSettingInput.user),
        };
      }

      if (createTimesheetSubJobSettingInput.geo_locations) {
        insData.geo_locations = {
          connect: mapIDArrayToEnum(createTimesheetSubJobSettingInput.user),
        };
      }

      insData.created_by = {
        created_by: {
          connect: createTimesheetSubJobSettingInput.created_by,
        },
      };

      return await this.prisma.timesheet_sub_jobs.create({
        select: {
          id: true,
          sub_job_title: true,
          all_user: true,
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
            },
          },
        },
        data: insData,
      });
    }

    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Sub Jobs are disabled',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  async findAll(jobId: number) {
    return await this.prisma.timesheet_sub_jobs.findMany({
      where: {
        job_id: jobId,
        status: {
          equals: 'ACTIVE',
        },
      },
      select: {
        id: true,
        sub_job_title: true,
        all_user: true,
        user: {
          select: {
            id: true,
            first_name: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.timesheet_sub_jobs.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        sub_job_title: true,
        all_user: true,
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
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
    updateTimesheetSubJobSettingInput: UpdateTimesheetSubJobSettingInput,
  ) {
    let updateData: any = updateTimesheetSubJobSettingInput;

    if (updateTimesheetSubJobSettingInput.all_user) {
      updateData.user = [];
    } else {
      updateData.all_user = false;
      updateData.user = {
        set: mapIDArrayToEnum(updateTimesheetSubJobSettingInput.user),
      };
    }

    return await this.prisma.timesheet_sub_jobs.update({
      where: {
        id,
      },
      data: updateData,
    });
  }

  async remove(id: number) {
    return await this.prisma.timesheet_sub_jobs.update({
      where: {
        id,
      },
      data: {
        status: 'DELETED',
      },
    });
  }
}
