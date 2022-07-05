import { Injectable } from '@nestjs/common';
import { CreateTimesheetInput } from './dto/create-timesheet.input';
import { UpdateTimesheetInput } from './dto/update-timesheet.input';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TimesheetsService {
  constructor(private prisma: PrismaService) {}

  async create(createTimesheetInput: CreateTimesheetInput) {
    let insertData: any = createTimesheetInput;

    insertData.org = {
      connect: { id: insertData.org },
    };
    insertData.created_by = {
      connect: { id: insertData.created_by },
    };

    insertData.general_settings = {
      create: {
        workweeks: {
          create: {},
        },
      },
    };

    insertData.customization_settings = {
      create: {},
    };

    insertData.payroll_settings = {
      create: {},
    };

    insertData.geo_location_settings = {
      create: {},
    };

    insertData.reminder_settings = {
      create: {},
    };

    insertData.notification_settings = {
      create: {},
    };

    insertData.timesheet_break_settings = {
      create: {
        timesheet_manual_breaks: {
          createMany: {
            data: [
              {
                break_type: 'Lunch Break',
                paid_type: 'PAID',
                duration: 30,
              },
              {
                break_type: 'Rest Break',
                paid_type: 'PAID',
                duration: 30,
              },
            ],
          },
        },
      },
    };
    return await this.prisma.timesheets.create({
      data: insertData,
    });
  }

  async findAll(orgId: number) {
    return await this.prisma.timesheets.findMany({
      where: {
        org_id: orgId,
      },
      include: {
        admins: {
          select: {
            email_id: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.timesheets.findUnique({
      where: {
        id,
      },
      include: {
        admins: {
          select: {
            email_id: true,
          },
        },
        // general_settings: {
        //   select: {
        //     id: true,
        //   },
        // },
        // customization_settings: {
        //   select: {
        //     id: true,
        //   },
        // },
        // payroll_settings: {
        //   select: {
        //     id: true,
        //   },
        // },
        // reminder_settings: {
        //   select: {
        //     id: true,
        //   },
        // },
        // notification_settings: {
        //   select: {
        //     id: true,
        //   },
        // },
        // job_settings: {
        //   select: {
        //     id: true,
        //   },
        //   include: {
        //     timesheet_sub_job_settings: {
        //       select: {
        //         id: true,
        //       },
        //     },
        //   },
        // },
        // geo_location_settings: {
        //   include: {
        //     timesheet_geo_location_job_settings: {
        //       include: {
        //         job_settings: true,
        //       },
        //     },
        //     timesheet_geo_location_sub_job_settings: {
        //       include: {
        //         sub_job_settings: true,
        //       },
        //     },
        //   },
        // },
      },
    });
  }

  update(id: number, updateTimesheetInput: UpdateTimesheetInput) {
    return `This action updates a #${id} timesheet`;
  }

  remove(id: number) {
    return `This action removes a #${id} timesheet`;
  }
}
