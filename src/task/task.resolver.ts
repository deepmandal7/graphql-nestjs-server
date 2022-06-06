import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskInput, SubTask } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { task } from '@prisma/client';
import { TaskBoardCustomisationService } from 'src/task_board_customisation/task_board_customisation.service';

@Resolver('Task')
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskboardCustomisationService: TaskBoardCustomisationService,
  ) {}

  @Mutation('createTasks')
  async createMany(
    @Args('createTaskInput') createTaskInput: CreateTaskInput[],
  ) {
    let tasks: any = createTaskInput;
    for (let task of tasks) {
      task.syear = task.syear || 0;
      task.smonth = task.smonth || 0;
      task.sdate = task.sdate || 0;
      task.shour = task.shour || 0;
      task.sminute = task.sminute || 0;
      task.eyear = task.eyear || 0;
      task.emonth = task.emonth || 0;
      task.edate = task.edate || 0;
      task.ehour = task.ehour || 0;
      task.eminute = task.eminute || 0;

      if (task.syear) {
        task.task_start_date_time = task.syear
          ? `${task.syear}-${String(task.smonth).padStart(2, '0')}-${String(
              task.sdate,
            ).padStart(2, '0')} ${String(task.shour).padStart(2, '0')}:${String(
              task.sminute,
            ).padStart(2, '0')}`
          : null;
      }

      if (task.eyear) {
        task.task_end_date_time = task.eyear
          ? `${task.eyear}-${String(task.emonth).padStart(2, '0')}-${String(
              task.edate,
            ).padStart(2, '0')} ${String(task.ehour).padStart(2, '0')}:${String(
              task.eminute,
            ).padStart(2, '0')}`
          : null;
      }

      if (task.task_coordinates) {
        task.task_coordinates = [
          parseFloat(task.task_coordinates.split(',')[0]),
          parseFloat(task.task_coordinates.split(',')[1]),
        ];
      }

      if (task.user_ids) {
        task.user = {
          connect: task.user_ids.map((userId) => {
            return { id: userId };
          }),
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
    return await this.taskService.createMany(tasks);
  }

  @Mutation('createTask')
  async create(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<task> {
    let taskBoardCustomisation =
      await this.taskboardCustomisationService.findOne(
        createTaskInput.task_board_id,
      );

    if (
      (taskBoardCustomisation.task_title_mandatory &&
        !createTaskInput.task_title) ||
      (taskBoardCustomisation.description_mandatory &&
        !createTaskInput.task_description) ||
      (taskBoardCustomisation.location_mandatory &&
        !createTaskInput.task_location) ||
      (taskBoardCustomisation.description_required &&
        !createTaskInput.task_description) ||
      (taskBoardCustomisation.location_required &&
        !createTaskInput.task_location)
    ) {
      let fieldName;
      if (!createTaskInput.task_title) {
        fieldName = 'task_title';
      }
      if (!createTaskInput.task_description) {
        fieldName = 'task_description';
      }
      if (!createTaskInput.task_location) {
        fieldName = 'task_location';
      }
      throw new BadRequestException({
        message: `${fieldName} is mandatory/required`,
        error: 'Bad Request',
      });
    }
    return await this.taskService.create({
      task_title: createTaskInput.task_title,
      task_description: createTaskInput.task_description,
      task_file_id: createTaskInput.task_file_id,
      task_frequency: createTaskInput.task_frequency,
      syear: createTaskInput.syear || 0,
      smonth: createTaskInput.smonth || 0,
      sdate: createTaskInput.sdate || 0,
      shour: createTaskInput.shour || 0,
      sminute: createTaskInput.sminute || 0,
      eyear: createTaskInput.eyear || 0,
      emonth: createTaskInput.emonth || 0,
      edate: createTaskInput.edate || 0,
      ehour: createTaskInput.ehour || 0,
      eminute: createTaskInput.eminute || 0,
      task_coordinates: createTaskInput.task_coordinates
        ? [
            parseFloat(createTaskInput.task_coordinates.split(',')[0]),
            parseFloat(createTaskInput.task_coordinates.split(',')[1]),
          ]
        : [],
      task_location: createTaskInput.task_location,
      created_by: {
        connect: { id: createTaskInput.created_by },
      },
      task_start_date_time: createTaskInput.syear
        ? `${createTaskInput.syear}-${String(createTaskInput.smonth).padStart(
            2,
            '0',
          )}-${String(createTaskInput.sdate).padStart(2, '0')} ${String(
            createTaskInput.shour,
          ).padStart(2, '0')}:${String(createTaskInput.sminute).padStart(
            2,
            '0',
          )}`
        : null,
      task_end_date_time: createTaskInput.eyear
        ? `${createTaskInput.eyear}-${String(createTaskInput.emonth).padStart(
            2,
            '0',
          )}-${String(createTaskInput.edate).padStart(2, '0')} ${String(
            createTaskInput.ehour,
          ).padStart(2, '0')}:${String(createTaskInput.eminute).padStart(
            2,
            '0',
          )}`
        : null,
      user: {
        connect: createTaskInput.user_ids
          ? createTaskInput.user_ids.map((userId) => {
              return { id: userId };
            })
          : [],
      },
      task_tag: {
        createMany: {
          data: createTaskInput.tag_ids
            ? createTaskInput.tag_ids.map((tagId) => {
                return {
                  tag_id: tagId,
                };
              })
            : [],
        },
      },
      repeat_details: {
        create: createTaskInput.repeat_details,
      },
      task_board: { connect: { id: createTaskInput.task_board_id } },
      sub_task: {
        create: createTaskInput.sub_task
          ? createTaskInput.sub_task.map((subTask) => {
              return {
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
                    ).padStart(2, '0')}:${String(subTask.sminute).padStart(
                      2,
                      '0',
                    )}`
                  : null,
                sub_task_end_date_time: subTask.eyear
                  ? `${subTask.eyear}-${String(subTask.emonth).padStart(
                      2,
                      '0',
                    )}-${String(subTask.edate).padStart(2, '0')} ${String(
                      subTask.ehour,
                    ).padStart(2, '0')}:${String(subTask.eminute).padStart(
                      2,
                      '0',
                    )}`
                  : null,
                created_by: subTask.created_by,
                user_ids: {
                  connect: subTask.user_ids
                    ? subTask.user_ids.map((userId) => {
                        return { id: userId };
                      })
                    : [],
                },
              };
            })
          : [],
      },
    });
  }

  @Query('tasks')
  async findAll(
    @Args('take') take: number,
    @Args('cursor') cursor: number,
    @Args('orgId') orgId: number,
    @Args('taskBoardId') taskBoardId: number,
    @Args('isUnassigned') isUnassigned: boolean,
    @Args('userIds') userIds: number[],
    @Args('userId') userId: number,
    @Args('dates') dates: string,
    @Args('startDates') startDates: string,
    @Args('fromStartYear') fromStartYear: number,
    @Args('fromStartMonth') fromStartMonth: number,
    @Args('fromStartDate') fromStartDate: number,
    @Args('toStartYear') toStartYear: number,
    @Args('toStartMonth') toStartMonth: number,
    @Args('toStartDate') toStartDate: number,
    @Args('taskStatus') taskStatus: string[],
    @Args('tagIds') tagIds: number[],
    @Args('createdBy') createdBy: number,
  ) {
    return await this.taskService.findAll(
      take,
      cursor ? { id: cursor } : null,
      orgId,
      taskBoardId,
      isUnassigned,
      userIds,
      userId,
      dates,
      startDates,
      fromStartYear,
      fromStartMonth,
      fromStartDate,
      toStartYear,
      toStartMonth,
      toStartDate,
      tagIds,
      createdBy,
      taskStatus,
    );
  }

  @Query('task')
  findOne(@Args('id') id: number) {
    return this.taskService.findOne(id);
  }

  @Query('userTasks')
  findUserTasks(@Args('userId') userId: number) {
    return this.taskService.findUserTasks(userId);
  }

  @Mutation('updateTask')
  update(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    let updateData: any = updateTaskInput;
    delete updateData.id;
    if (updateTaskInput.user_ids) {
      updateData.user = {
        set: updateTaskInput.user_ids.map((userId) => {
          return { id: userId };
        }),
      };
    }
    if (updateTaskInput.tag_ids) {
      updateData.task_tag = {
        set: updateTaskInput.tag_ids.map((tagId) => {
          return {
            task_id_tag_id: {
              task_id: updateTaskInput.id,
              tag_id: tagId,
            },
          };
        }),
      };
    }
    return this.taskService.update(updateTaskInput.id, updateData);
  }

  @Mutation('removeTask')
  remove(@Args('id') id: number) {
    return this.taskService.remove(id);
  }
}
