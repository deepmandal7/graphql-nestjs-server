import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { task, Prisma } from '@prisma/client';
import {
  coordinatesStringToArray,
  mapIDArrayToEnum,
} from '../common/utils/common_utils';
import { UpdateTaskInput } from './dto/update-task.input';
import { QueryTaskInput } from './dto/query-task.input';
import { Novu } from '@novu/node';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(data): Promise<task> {
    let insertData: Prisma.taskCreateInput = {
      task_title: data.task_title,
      task_description: data.task_description,
      task_file_id: data.task_file_id,
      task_frequency: data.task_frequency,
      task_coordinates: data.task_coordinates
        ? coordinatesStringToArray(data.task_coordinates)
        : [],
      task_location: data.task_location,
      created_by: {
        connect: { id: data.created_by },
      },
      task_start_date_time: data.task_start_date_time
        ? data.task_start_date_time
        : null,
      task_end_date_time: data.task_end_date_time
        ? data.task_end_date_time
        : null,
      user: {
        connect: data.user_ids ? mapIDArrayToEnum(data.user_ids) : [],
      },
      task_tag: {
        createMany: {
          data: data.tag_ids
            ? data.tag_ids.map((tagId) => {
                return {
                  tag_id: tagId,
                };
              })
            : [],
        },
      },
      repeat_details: {
        create: data.repeat_details,
      },
      task_board: { connect: { id: data.task_board_id } },
      sub_task: {
        create: data.sub_task
          ? data.sub_task.map((subTask) => {
              return {
                task_description: subTask.task_description,
                sub_task_start_date_time: subTask.sub_task_start_date_time
                  ? subTask.sub_task_start_date_time
                  : null,
                sub_task_end_date_time: subTask.sub_task_end_date_time
                  ? subTask.sub_task_end_date_time
                  : null,
                created_by: subTask.created_by,
                user_ids: {
                  connect: subTask.user_ids
                    ? mapIDArrayToEnum(subTask.user_ids)
                    : [],
                },
              };
            })
          : [],
      },
    };
    return await this.prisma.task.create({
      data: insertData,
    });
  }

  async createMany(data): Promise<task[]> {
    let tasks: any[] = data;
    for (let task of tasks) {
      task.task_start_date_time = task.task_start_date_time
        ? task.task_start_date_time
        : null;

      task.task_end_date_time = task.task_end_date_time
        ? task.task_end_date_time
        : null;

      if (task.task_coordinates) {
        task.task_coordinates = coordinatesStringToArray(task.task_coordinates);
      }

      if (task.user_ids) {
        task.user = {
          connect: mapIDArrayToEnum(task.user_ids),
        };
      }

      if (task.tag_ids) {
        task.task_tag = {
          createMany: {
            data: task.tag_ids.map((tagId) => {
              return { tag_id: tagId };
            }),
          },
        };
      }
      task.task_board = {
        connect: {
          id: task.task_board_id,
        },
      };
      task.task_frequency = 'ONEOFF';
      delete task.task_board_id;
      delete task.user_ids;
      delete task.tag_ids;
    }
    return await Promise.all(
      tasks.map((task) => {
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
    searchText: string | null,
    queryTaskInput: QueryTaskInput | null,
  ) {
    if (searchText)
      return await this.prisma.task.findMany({
        select: {
          id: true,
          task_title: true,
          task_description: true,
          task_frequency: true,
          task_tag: { select: { tag: true } },
          task_start_date_time: true,
          task_end_date_time: true,
          task_coordinates: true,
          task_location: true,
          task_status: true,
          repeat_details: true,
          created_at: true,
          updated_at: true,
          created_by: true,
        },
        where: {
          task_board: { is: { org_id: orgId } },
          task_title: {
            contains: searchText,
          },
        },
      });

    let filter: any = {
      where: {
        task_board: {
          is: {
            org_id: orgId,
          },
        },
        task_status: {
          not: { equals: 'DELETED' },
        },
      },
      // orderBy: {
      //   created_at: 'asc',
      // },
      take,
      include: {
        user: true,
        task_tag: {
          include: {
            tag: true,
          },
        },
      },
    };

    if (queryTaskInput.taskBoardId) {
      filter.where.task_board_id = {
        equals: queryTaskInput.taskBoardId,
      };
    }
    if (queryTaskInput.isUnassigned || queryTaskInput.userIds) {
      if (queryTaskInput.isUnassigned) {
        filter.where.user = {
          every: {
            id: undefined,
          },
        };
      }
      if (queryTaskInput.userIds) {
        filter.where.user = {
          some: {
            id: {
              in: queryTaskInput.userIds,
            },
          },
        };
      }
    }
    if (queryTaskInput.userId) {
      filter.where.user = {
        some: {
          id: {
            equals: queryTaskInput.userId,
          },
        },
      };
    }
    if (queryTaskInput.endDate) {
      switch (queryTaskInput.endDate) {
        case 'overdue':
          filter.where.task_end_date_time = {
            lt: queryTaskInput.filter_date_time,
          };
          break;
        case 'next':
          filter.where.task_end_date_time = {
            gte: queryTaskInput.filter_date_time,
            lt: queryTaskInput.next_date_time,
          };
          break;
        case 'nodue':
          filter.where.task_end_date_time = {
            equals: null,
          };
          break;
      }
      if (queryTaskInput.startDate) {
        switch (queryTaskInput.endDate) {
          case 'started':
            filter.where.task_start_date_time = {
              lt: queryTaskInput.filter_date_time,
            };
            break;
          case 'next':
            filter.where.task_start_date_time = {
              gte: queryTaskInput.filter_date_time,
              lt: queryTaskInput.next_date_time,
            };
            break;
          case 'nodate':
            filter.where.task_start_date_time = {
              equals: null,
            };
            break;
        }
      }
    }

    if (queryTaskInput.taskStatus) {
      filter.where.task_status = {
        in: queryTaskInput.taskStatus,
      };
    }
    if (queryTaskInput.tagIds) {
      filter.where.task_tag = {
        some: {
          tag_id: {
            in: queryTaskInput.tagIds,
          },
        },
      };
    }
    if (queryTaskInput.createdBy) {
      filter.where.created_by = {
        equals: queryTaskInput.createdBy,
      };
    }
    if (cursor) {
      filter.cursor = cursor;
      filter.skip = 1;
    }
    let data: any = await this.prisma.task.findMany(filter);
    // console.log(data);
    if (queryTaskInput.isUnassigned) {
      data = data.filter((item) => !item.user.length);
    }
    if (queryTaskInput.userIds) {
      data = data.filter((item) => {
        let count = 0;
        item.user.forEach((user) => {
          if (queryTaskInput.userIds.includes(user.id)) count++;
        });
        if (count === queryTaskInput.userIds.length) return item;
      });
    }
    if (queryTaskInput.tagIds) {
      data = data.filter((item) => {
        let count = 0;
        item.task_tag.forEach((taskTag) => {
          if (queryTaskInput.tagIds.includes(taskTag.tag_id)) count++;
        });
        if (count === queryTaskInput.tagIds.length) return item;
      });
    }
    return data;
  }

  async findOne(id: number) {
    return await this.prisma.task.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        task_title: true,
        task_description: true,
        task_file_id: true,
        task_frequency: true,
        task_start_date_time: true,
        task_end_date_time: true,
        task_coordinates: true,
        task_location: true,
        sub_task: true,
        task_status: true,
        repeat_details: true,
        created_at: true,
        updated_at: true,
        task_tag: { select: { tag: true } },
        task_comments: true,
        user: true,
        created_by: true,
      },
    });
    // console.log(data);;
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
      select: {
        id: true,
        task_title: true,
        task_description: true,
        task_file_id: true,
        task_frequency: true,
        task_start_date_time: true,
        task_end_date_time: true,
        task_coordinates: true,
        task_location: true,
        task_status: true,
        repeat_details: true,
        created_at: true,
        updated_at: true,
        task_tag: { select: { tag: true } },
        task_comments: true,
        created_by: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.task.update({
      where: {
        id,
      },
      data: {
        task_status: 'DELETED',
      },
    });
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
