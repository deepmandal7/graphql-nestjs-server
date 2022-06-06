import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { task, Prisma } from '@prisma/client';
import { UpdateTaskInput } from './dto/update-task.input';
import { Novu } from '@novu/node';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.taskCreateInput): Promise<task> {
    return await this.prisma.task.create({
      data,
      include: {
        user: true,
      },
    });
  }

  async createMany(data): Promise<task[]> {
    return await Promise.all(
      data.map((task) => {
        return this.prisma.task.create({
          data: task,
          include: {
            user: true,
          },
        });
      }),
    );
  }

  async findAll(
    take: number,
    cursor: Prisma.taskWhereUniqueInput | null,
    orgId: number,
    taskBoardId: number,
    isUnassigned: boolean,
    userIds: number[],
    userId: number,
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
    taskStatus: string[],
  ) {
    let filter: any = {
      where: {},
      // orderBy: {
      //   created_at: 'asc',
      // },
      take,
      include: {
        user: true,
        task_tag: true,
      },
    };
    let timezone: any;
    let orgLocalTime: any;
    let orgYear: number;
    let orgMonth: number;
    let orgDate: number;
    let orgHours: number;
    let orgMinutes: number;
    if (taskBoardId) {
      filter.where.task_board_id = {
        equals: taskBoardId,
      };
    }
    if (isUnassigned || userIds) {
      if (isUnassigned) {
        filter.where.user = {
          every: {
            id: undefined,
          },
        };
      }
      if (userIds) {
        filter.where.user = {
          some: {
            id: {
              in: userIds,
            },
          },
        };
      }
    }
    if (userId) {
      filter.where.user = {
        some: {
          id: {
            equals: userId,
          },
        },
      };
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
        in: taskStatus,
      };
    }
    if (tagId) {
      filter.where.task_tag = {
        some: {
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
    let data: any = await this.prisma.task.findMany(filter);
    if (isUnassigned) {
      data = data.filter((item) => !item.user.length);
    }
    if (userIds) {
      data = data.filter((item) => {
        let count = 0;
        item.user.forEach((user) => {
          if (userIds.includes(user.id)) count++;
        });
        if (count === userIds.length) return item;
      });
    }
    if (tagId) {
      data = data.filter((item) => {
        let count = 0;
        item.task_tag.forEach((taskTag) => {
          if (tagId.includes(taskTag.tag_id)) count++;
        });
        if (count === tagId.length) return item;
      });
    }
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: number, updateTaskInput: Prisma.taskUpdateInput) {
    switch (updateTaskInput.task_status) {
      case 'Duplicate':
        let task = await this.prisma.task.findUnique({
          where: {
            id,
          },
          include: {
            created_by: true,
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
              created_by: {
                connect: { id: task.created_by.id },
              },
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
                return result;
              });
          });
      default:
        return await this.prisma.task.update({
          where: {
            id,
          },
          data: updateTaskInput,
        });
    }
  }

  async findUserTasks(userId: number) {
    return await this.prisma.task.findMany({
      where: {
        user: {
          some: {
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

//   // const novu = new Novu('10de244c8fe844a7674746629f38d13d');
//   // const subscriber = await novu.subscribers.identify('2', {
//   //   email: 'deepmandal4742@gmail.com',
//   //   firstName: 'Deep',
//   //   lastName: 'Mandal',
//   //   phone: '7864805108',
//   //   avatar: 'some avatar',
//   // });
//   // let upd = await novu.subscribers.update('62902ebd3c3e82001812b90a', {
//   //   email: 'deepmandal4742@gmail.com',
//   // });
//   // console.log(upd.data);
//   // console.log(subscriber.data);
//   // let notifRes = await novu.trigger('test-notification', {
//   //   to: {
//   //     email: 'deepmandal4742@gmail.com',
//   //     subscriberId: '62902ebd3c3e82001812b90a',
//   //   },
//   //   payload: {},
//   // });
//   // console.log(notifRes.data);
//   // console.log(subTasks);
//   if (subTasks) {
//     for (let subTask of subTasks) {
//       let subTaskObj: any = subTask;
//       subTaskObj.task_id = result.id;
//       console.log(subTaskObj);
//       // subTaskObj.user_ids = {
//       //   connect: subTaskObj.user_ids
//       //     ? subTaskObj.user_ids.map((userId) => {
//       //         return { id: userId };
//       //       })
//       //     : [],
//       // };
//       await this.prisma.sub_task.create({
//         data: {
//           task: {
//             connect: {
//               id: subTaskObj.task_id,
//             },
//           },
//           task_description: subTaskObj.task_description,
//           syear: subTaskObj.syear,
//           smonth: subTaskObj.smonth,
//           sdate: subTaskObj.sdate,
//           shour: subTaskObj.shour,
//           sminute: subTaskObj.sminute,
//           eyear: subTaskObj.eyear,
//           emonth: subTaskObj.emonth,
//           edate: subTaskObj.edate,
//           ehour: subTaskObj.ehour,
//           eminute: subTaskObj.eminute,
//           sub_task_start_date_time: subTaskObj.syear
//             ? `${subTaskObj.syear}-${String(subTaskObj.smonth).padStart(
//                 2,
//                 '0',
//               )}-${String(subTaskObj.sdate).padStart(2, '0')} ${String(
//                 subTaskObj.shour,
//               ).padStart(2, '0')}:${String(subTaskObj.sminute).padStart(
//                 2,
//                 '0',
//               )}`
//             : null,
//           sub_task_end_date_time: subTaskObj.eyear
//             ? `${subTaskObj.eyear}-${String(subTaskObj.emonth).padStart(
//                 2,
//                 '0',
//               )}-${String(subTaskObj.edate).padStart(2, '0')} ${String(
//                 subTaskObj.ehour,
//               ).padStart(2, '0')}:${String(subTaskObj.eminute).padStart(
//                 2,
//                 '0',
//               )}`
//             : null,
//           created_by: subTaskObj.created_by,
//           user_ids: {
//             connect: subTaskObj.user_ids
//               ? subTaskObj.user_ids.map((userId) => {
//                   return { id: userId };
//                 })
//               : [],
//           },
//         },
//         include: {
//           user_ids: true,
//         },
//       });
//     }
//   }
//   // console.log(result);
//   return result;
// })
