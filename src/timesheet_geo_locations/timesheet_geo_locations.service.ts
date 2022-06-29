import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { mapIDArrayToEnum } from 'src/common/utils/common_utils';
import { PrismaService } from 'src/prisma.service';
import { CreateTimesheetGeoLocationInput } from './dto/create-timesheet_geo_location.input';
import { QueryTimesheetGeoLocationInput } from './dto/query-timesheet_geo_location.input';
import { UpdateTimesheetGeoLocationInput } from './dto/update-timesheet_geo_location.input';

@Injectable()
export class TimesheetGeoLocationsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createTimesheetGeoLocationInput: CreateTimesheetGeoLocationInput,
  ) {
    let insData: any = createTimesheetGeoLocationInput;

    insData.created_by = {
      created_by: {
        connect: createTimesheetGeoLocationInput.created_by,
      },
    };

    insData.timesheets = {
      connect: { id: createTimesheetGeoLocationInput.timesheets },
    };

    insData.jobs = {
      connect: createTimesheetGeoLocationInput.jobs.length
        ? mapIDArrayToEnum(createTimesheetGeoLocationInput.jobs)
        : [],
    };
    return await this.prisma.timesheet_geo_locations.create({
      data: insData,
    });
  }

  async findAll(
    take: number,
    cursor: Prisma.timesheet_geo_locationsWhereUniqueInput | null,
    orgId: number,
    searchText: string | null,
    queryTimesheetGeoLocationInput: QueryTimesheetGeoLocationInput,
  ) {
    if (searchText)
      return await this.prisma.timesheet_geo_locations.findMany({
        select: {
          id: true,
          site_name: true,
          site_address: true,
        },
        where: {
          timesheets_id: queryTimesheetGeoLocationInput.timesheet_id,
          OR: [
            {
              site_name: {
                contains: searchText,
              },
            },
            {
              site_address: {
                contains: searchText,
              },
            },
          ],
        },
      });
    let filter: any = {
      where: {
        timesheets_id: queryTimesheetGeoLocationInput.timesheet_id,
        status: {
          equals: 'ACTIVE',
        },
      },
      // orderBy: {
      //   created_at: 'asc',
      // },
      select: {
        id: true,
        site_name: true,
        site_address: true,
        jobs: {
          where: { status: { equals: 'ACTIVE' } },
          select: {
            id: true,
            job_title: true,
          },
        },
      },
      take,
    };

    if (cursor) {
      filter.cursor = cursor;
      filter.skip = 1;
    }
    return await this.prisma.timesheet_geo_locations.findMany(filter);
  }

  async findOne(id: number) {
    return await this.prisma.timesheet_geo_locations.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateTimesheetGeoLocationInput: UpdateTimesheetGeoLocationInput,
  ) {
    let updateData: any = updateTimesheetGeoLocationInput;

    updateData.jobs = {
      set:
        updateTimesheetGeoLocationInput.jobs &&
        updateTimesheetGeoLocationInput.jobs.length
          ? mapIDArrayToEnum(updateTimesheetGeoLocationInput.jobs)
          : [],
    };
    return await this.prisma.timesheet_geo_locations.update({
      where: {
        id,
      },
      data: updateData,
    });
  }

  async remove(id: number) {
    return await this.prisma.timesheet_geo_locations.update({
      where: {
        id,
      },
      data: {
        status: 'DELETED',
      },
    });
  }
}
