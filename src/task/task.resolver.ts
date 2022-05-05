import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { task } from '@prisma/client';

@Resolver('Task')
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation('createTask')
  async create(@Args('createTaskInput') createTaskInput: CreateTaskInput): Promise<task> {
    return await this.taskService.create({
      task_title: createTaskInput.task_title,
      task_description: createTaskInput.task_description,
      task_file_id: createTaskInput.task_file_id,
      task_frequency: createTaskInput.task_frequency,
      task_start_utc_date_time: createTaskInput.task_start_utc_date_time,
      task_end_utc_date_time: createTaskInput.task_end_utc_date_time,
      task_coordinates: [parseFloat(createTaskInput.task_coordinates.split(",")[0]), parseFloat(createTaskInput.task_coordinates.split(",")[1])],
      task_location: createTaskInput.task_location,
      task_status: createTaskInput.task_status,
      created_by: createTaskInput.created_by,
      repeat_details: {
        create: createTaskInput.repeat_details
      },
      task_board: { connect: { id: createTaskInput.task_board_id } },
    });
  }

  @Query('tasks')
  async findAll(@Args('take') take: number,
  @Args('cursor') cursor: number,) {
    return await this.taskService.findAll(
      take,
      cursor ? { id: cursor } : null
    );
  }

  @Query('task')
  findOne(@Args('id') id: number) {
    return this.taskService.findOne(id);
  }

  @Mutation('updateTask')
  update(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation('removeTask')
  remove(@Args('id') id: number) {
    return this.taskService.remove(id);
  }
}
