import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskInput, SubTask } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { task } from '@prisma/client';
import {
  digitsToDateTime,
  coordinatesStringToArray,
} from '../common/utils/task_utils';
import { mapIDArrayToEnum } from '../common/utils/common_utils';
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
          ? digitsToDateTime(
              task.syear,
              task.smonth,
              task.sdate,
              task.shour,
              task.sminute,
            )
          : null;
      }

      if (task.eyear) {
        task.task_end_date_time = task.eyear
          ? digitsToDateTime(
              task.eyear,
              task.emonth,
              task.edate,
              task.ehour,
              task.eminute,
            )
          : null;
      }

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
        ? coordinatesStringToArray(createTaskInput.task_coordinates)
        : [],
      task_location: createTaskInput.task_location,
      created_by: {
        connect: { id: createTaskInput.created_by },
      },
      task_start_date_time: createTaskInput.syear
        ? digitsToDateTime(
            createTaskInput.syear,
            createTaskInput.smonth,
            createTaskInput.sdate,
            createTaskInput.shour,
            createTaskInput.sminute,
          )
        : null,
      task_end_date_time: createTaskInput.eyear
        ? digitsToDateTime(
            createTaskInput.eyear,
            createTaskInput.emonth,
            createTaskInput.edate,
            createTaskInput.ehour,
            createTaskInput.eminute,
          )
        : null,
      user: {
        connect: createTaskInput.user_ids
          ? mapIDArrayToEnum(createTaskInput.user_ids)
          : [],
      },
      task_tag: {
        createMany: {
          data: createTaskInput.tag_ids.map((tagId) => {
            return {
              tag_id: tagId,
            };
          }),
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
                  ? digitsToDateTime(
                      subTask.syear,
                      subTask.smonth,
                      subTask.sdate,
                      subTask.shour,
                      subTask.sminute,
                    )
                  : null,
                sub_task_end_date_time: subTask.eyear
                  ? digitsToDateTime(
                      subTask.eyear,
                      subTask.emonth,
                      subTask.edate,
                      subTask.ehour,
                      subTask.eminute,
                    )
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
    @Args('searchText') searchText: string,
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
      searchText,
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
        set: mapIDArrayToEnum(updateTaskInput.user_ids),
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
