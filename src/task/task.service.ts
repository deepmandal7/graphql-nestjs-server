import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { task, Prisma } from '@prisma/client';
import { UpdateTaskInput } from './dto/update-task.input';
import { Novu } from '@novu/node';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.taskCreateInput, subTasks): Promise<task> {
    return await this.prisma.task.create({ data }).then(async (result) => {
      const novu = new Novu('10de244c8fe844a7674746629f38d13d');
      const subscriber = await novu.subscribers.identify('2', {
        email: 'deepmandal4742@gmail.com',
        firstName: 'Deep',
        lastName: 'Mandal',
        phone: '7864805108',
        avatar: 'some avatar',
      });
      let upd = await novu.subscribers.update('62902ebd3c3e82001812b90a', {
        email: 'deepmandal4742@gmail.com',
      });
      console.log(upd.data);
      console.log(subscriber.data);
      let notifRes = await novu.trigger('test-notification', {
        to: {
          email: 'deepmandal4742@gmail.com',
          subscriberId: '62902ebd3c3e82001812b90a',
        },
        payload: {},
      });
      console.log(notifRes.data);
      for (let subTask of subTasks) {
        subTask.task_id = result.id;
        subTask.user_ids = {
          connect: subTask.user_ids
            ? subTask.user_ids.map((userId) => {
                return { id: userId };
              })
            : [],
        };
        await this.prisma.sub_task.create({
          data: {
            task: {
              connect: {
                id: subTask.task_id,
              },
            },
            task_description: subTask.task_description,
            syear: subTask.syear,
            smonth: subTask.smonth,
            sdate: subTask.sdate,
            shour: subTask.shour,
            sminute: subTask.sminute,
            eyear: subTask.eyear,
            emonth: subTask.emonth,
            edate: subTask.edate,
            ehour: subTask.ehour,
            eminute: subTask.eminute,
            sub_task_start_date_time: subTask.syear
              ? `${subTask.syear}-${String(subTask.smonth).padStart(
                  2,
                  '0',
                )}-${String(subTask.sdate).padStart(2, '0')} ${String(
                  subTask.shour,
                ).padStart(2, '0')}:${String(subTask.sminute).padStart(2, '0')}`
              : null,
            sub_task_end_date_time: subTask.eyear
              ? `${subTask.eyear}-${String(subTask.emonth).padStart(
                  2,
                  '0',
                )}-${String(subTask.edate).padStart(2, '0')} ${String(
                  subTask.ehour,
                ).padStart(2, '0')}:${String(subTask.eminute).padStart(2, '0')}`
              : null,
            created_by: subTask.created_by,
            user_ids: {
              connect: subTask.user_ids
                ? subTask.user_ids.map((userId) => {
                    return { id: userId };
                  })
                : [],
            },
          },
        });
      }
      return result;
    });
  }

  async createMany(
    data: Prisma.taskCreateManyInput[],
    taskTags,
  ): Promise<number> {
    let createCount = await this.prisma.task.createMany({ data });
    let taskTitle = [];
    let taskBoardId = data[0].task_board_id;
    for (let taskTag of taskTags) {
      taskTitle.push(taskTag.task_title);
    }
    let tasks = await this.prisma.task.findMany({
      where: {
        task_title: {
          in: taskTitle,
        },
        task_board_id: taskBoardId,
      },
    });
    for (let task of tasks) {
      for (let item of taskTags) {
        if (item.task_title === task.task_title) {
          item.task_id = task.id;
          delete item.task_title;
        }
      }
    }
    await this.prisma.task_tag.createMany({
      data: taskTags,
    });

    return createCount.count;
  }

  async findAll(
    take: number,
    cursor: Prisma.taskWhereUniqueInput | null,
    orgId: number,
    isUnassigned: boolean,
    userIds: number[],
    dates: string,
    startDate: string,
    fromStartYear: number,
    fromStartMonth: number,
    fromStartDate: number,
    toStartYear: number,
    toStartMonth: number,
    toStartDate: number,
    tagId: number[],
    createdBy: number,
    taskStatus: String,
  ) {
    let filter: any = {
      where: {},
      // orderBy: {
      //   created_at: 'asc',
      // },
      take,
    };
    let timezone: any;
    let orgLocalTime: any;
    let orgYear: number;
    let orgMonth: number;
    let orgDate: number;
    let orgHours: number;
    let orgMinutes: number;
    if (isUnassigned || userIds) {
      filter.where.OR = [];
      if (isUnassigned) {
        filter.where.OR.push({
          user_ids: {
            equals: null,
          },
        });
      }
      if (userIds) {
        filter.where.OR.push({
          user_ids: {
            hasSome: userIds,
          },
        });
      }
    }

    if (dates || startDate) {
      timezone = await this.prisma.organization.findUnique({
        select: {
          timezone: true,
        },
        where: {
          id: orgId,
        },
      });
      orgLocalTime = new Date(
        new Date().toLocaleString('en-US', { timeZone: timezone.timezone }),
      );
      orgYear = orgLocalTime.getFullYear();
      orgMonth = orgLocalTime.getMonth();
      orgDate = orgLocalTime.getDate();
      orgHours = orgLocalTime.getHours();
      orgMinutes = orgLocalTime.getMinutes();
      if (dates) {
        switch (dates) {
          case 'overdue':
            filter.where.task_end_date_time = {
              lt: orgLocalTime,
            };
            break;
          case 'today':
            filter.where.task_end_date_time = {
              startsWith: `${orgYear}-${String(orgMonth).padStart(
                2,
                '0',
              )}-${String(orgDate).padStart(2, '0')}`,
            };
            break;
          case 'tomorrow':
            orgLocalTime.setDate(orgLocalTime.getDate() + 1);
            let orgTomYear = orgLocalTime.getFullYear();
            let orgTomMonth = orgLocalTime.getMonth();
            let orgTomDate = orgLocalTime.getDate();
            filter.where.task_end_date_time = {
              startsWith: `${orgTomYear}-${String(orgTomMonth).padStart(
                2,
                '0',
              )}-${String(orgTomDate).padStart(2, '0')}`,
            };
            break;
          case 'nodue':
            filter.where.task_end_date_time = {
              equals: null,
            };
            break;
          case 'next':
            filter.where.task_end_date_time = {
              gte: `${fromStartYear}-${String(fromStartMonth).padStart(
                2,
                '0',
              )}-${String(fromStartDate).padStart(2, '0')}`,
              lte: `${toStartYear}-${String(toStartMonth).padStart(
                2,
                '0',
              )}-${String(toStartDate).padStart(2, '0')}`,
            };
            break;
        }
        if (startDate) {
          switch (startDate) {
            case 'started':
              filter.where.task_start_date_time = {
                lt: orgLocalTime,
              };
              break;
            case 'today':
              filter.where.task_start_date_time = {
                startsWith: `${orgYear}-${String(orgMonth).padStart(
                  2,
                  '0',
                )}-${String(orgDate).padStart(2, '0')}`,
              };
              break;
            case 'tomorrow':
              orgLocalTime.setDate(orgLocalTime.getDate() + 1);
              let orgTomYear = orgLocalTime.getFullYear();
              let orgTomMonth = orgLocalTime.getMonth();
              let orgTomDate = orgLocalTime.getDate();
              filter.where.task_start_date_time = {
                startsWith: `${orgTomYear}-${String(orgTomMonth).padStart(
                  2,
                  '0',
                )}-${String(orgTomDate).padStart(2, '0')}`,
              };
              break;
            case 'nodate':
              filter.where.task_start_date_time = {
                equals: null,
              };
              break;
            case 'next':
              filter.where.task_end_date_time = {
                gte: `${fromStartYear}-${String(fromStartMonth).padStart(
                  2,
                  '0',
                )}-${String(fromStartDate).padStart(2, '0')}`,
                lte: `${toStartYear}-${String(toStartMonth).padStart(
                  2,
                  '0',
                )}-${String(toStartDate).padStart(2, '0')}`,
              };
              break;
          }
        }
      }
    }
    if (taskStatus) {
      filter.where.task_status = {
        equals: taskStatus,
      };
    }
    if (tagId) {
      filter.where.task_tag = {
        every: {
          tag_id: {
            in: tagId,
          },
        },
      };
    }
    if (createdBy) {
      filter.where.created_by = {
        equals: createdBy,
      };
    }
    if (cursor) {
      filter.cursor = cursor;
      filter.skip = 1;
    }

    let data = await this.prisma.task.findMany(filter);

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: number, updateTaskInput: Prisma.sub_taskUpdateInput) {
    switch (updateTaskInput.task_status) {
      case 'Duplicate':
        let task = await this.prisma.task.findUnique({
          where: {
            id,
          },
        });
        return await this.prisma.task
          .create({
            data: {
              task_title: task.task_title,
              task_description: task.task_description,
              task_file_id: task.task_file_id,
              task_frequency: task.task_frequency,
              syear: task.syear,
              smonth: task.smonth,
              sdate: task.sdate,
              shour: task.shour,
              sminute: task.sminute,
              eyear: task.eyear,
              emonth: task.emonth,
              edate: task.edate,
              ehour: task.ehour,
              eminute: task.eminute,
              task_start_date_time: task.task_start_date_time,
              task_end_date_time: task.task_end_date_time,
              task_coordinates: task.task_coordinates,
              task_location: task.task_location,
              task_board: {
                connect: {
                  id: task.task_board_id,
                },
              },
              task_status: task.task_status,
              created_by: task.created_by,
            },
          })
          .then(async (result) => {
            await this.prisma.sub_task
              .findMany({
                where: {
                  task_id: task.id,
                },
              })
              .then(async (subTasks) => {
                await this.prisma.sub_task.createMany({
                  data: subTasks,
                });
              });
          });
      default:
        return await this.prisma.task.update({
          where: {
            id,
          },
          data: updateTaskInput,
        });
        break;
    }
  }

  async findUserTasks(userId: number) {
    return this.prisma.task.findMany({
      where: {
        user: {
          every: {
            id: {
              equals: userId,
            },
          },
        },
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
