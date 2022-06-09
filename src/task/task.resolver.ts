import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskInput, SubTask } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { QueryTaskInput } from './dto/query-task.input';
import { task } from '@prisma/client';
import {
  digitsToDateTime,
  coordinatesStringToArray,
  mapIDArrayToEnum,
} from '../common/utils/common_utils';
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
    return await this.taskService.createMany(createTaskInput);
  }

  @Mutation('createTask')
  async create(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<task> {
    await this.taskboardCustomisationService.customisationValidate(
      await this.taskboardCustomisationService.findAll(
        createTaskInput.task_board_id,
      ),
      createTaskInput,
    );

    return await this.taskService.create(createTaskInput);
  }

  @Query('getTasks')
  async findAll(
    @Args('take') take: number,
    @Args('cursor') cursor: number,
    @Args('orgId') orgId: number,
    @Args('searchText') searchText: string,
    @Args('queryTaskInput') queryTaskInput: QueryTaskInput,
  ) {
    return await this.taskService.findAll(
      take,
      cursor ? { id: cursor } : null,
      orgId,
      searchText,
      queryTaskInput,
    );
  }

  @Query('getTask')
  findOne(@Args('id') id: number) {
    return this.taskService.findOne(id);
  }

  @Query('getUserTasks')
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
