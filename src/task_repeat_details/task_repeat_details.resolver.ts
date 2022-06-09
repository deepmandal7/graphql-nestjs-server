import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskRepeatDetailsService } from './task_repeat_details.service';
import { CreateTaskRepeatDetailInput } from './dto/create-task_repeat_detail.input';
import { UpdateTaskRepeatDetailInput } from './dto/update-task_repeat_detail.input';

@Resolver('TaskRepeatDetail')
export class TaskRepeatDetailsResolver {
  constructor(
    private readonly taskRepeatDetailsService: TaskRepeatDetailsService,
  ) {}

  @Mutation('createTaskRepeatDetail')
  async create(
    @Args('createTaskRepeatDetailInput')
    createTaskRepeatDetailInput: CreateTaskRepeatDetailInput,
  ) {
    return await this.taskRepeatDetailsService.create(
      createTaskRepeatDetailInput,
    );
  }

  @Query('getTaskRepeatDetail')
  async findOne(@Args('taskId') taskId: number) {
    return await this.taskRepeatDetailsService.findOne(taskId);
  }

  @Mutation('updateTaskRepeatDetail')
  async update(
    @Args('updateTaskRepeatDetailInput')
    updateTaskRepeatDetailInput: UpdateTaskRepeatDetailInput,
  ) {
    return await this.taskRepeatDetailsService.update(
      updateTaskRepeatDetailInput.id,
      updateTaskRepeatDetailInput,
    );
  }

  @Mutation('removeTaskRepeatDetail')
  remove(@Args('id') id: number) {
    return this.taskRepeatDetailsService.remove(id);
  }
}
