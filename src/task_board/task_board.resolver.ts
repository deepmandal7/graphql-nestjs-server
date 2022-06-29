import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskBoardService } from './task_board.service';
import { CreateTaskBoardInput } from './dto/create-task_board.input';
import { UpdateTaskBoardInput } from './dto/update-task_board.input';

@Resolver('TaskBoard')
export class TaskBoardResolver {
  constructor(private readonly taskBoardService: TaskBoardService) {}

  @Mutation('createTaskBoard')
  async create(@Args('input') createTaskBoardInput: CreateTaskBoardInput) {
    return await this.taskBoardService.create({
      task_board_name: createTaskBoardInput.task_board_name,
      created_by: createTaskBoardInput.created_by,
      can_create: createTaskBoardInput.can_create,
      org: {
        connect: {
          id: createTaskBoardInput.org_id,
        },
      },
      task_board_customisation: {
        createMany: {
          data: ['task_title', 'task_description', 'task_location'].map(
            (fieldName) => {
              return {
                field_name: fieldName,
              };
            },
          ),
        },
      },
    });
  }

  @Query('getTaskBoards')
  async findAll(@Args('orgId') orgId: number) {
    return await this.taskBoardService.findAll(orgId);
  }

  @Mutation('updateTaskBoard')
  async update(@Args('input') updateTaskBoardInput: UpdateTaskBoardInput) {
    return await this.taskBoardService.update(
      updateTaskBoardInput.id,
      updateTaskBoardInput,
    );
  }

  @Mutation('removeTaskBoard')
  async remove(@Args('id') id: number) {
    return await this.taskBoardService.remove(id);
  }
}
