import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskRepeatDetailsService } from './task_repeat_details.service';
import { CreateTaskRepeatDetailInput } from './dto/create-task_repeat_detail.input';
import { UpdateTaskRepeatDetailInput } from './dto/update-task_repeat_detail.input';

@Resolver('TaskRepeatDetail')
export class TaskRepeatDetailsResolver {
  constructor(private readonly taskRepeatDetailsService: TaskRepeatDetailsService) {}

  @Mutation('createTaskRepeatDetail')
  create(@Args('createTaskRepeatDetailInput') createTaskRepeatDetailInput: CreateTaskRepeatDetailInput) {
    return this.taskRepeatDetailsService.create(createTaskRepeatDetailInput);
  }

  @Query('taskRepeatDetails')
  findAll() {
    return this.taskRepeatDetailsService.findAll();
  }

  @Query('taskRepeatDetail')
  findOne(@Args('id') id: number) {
    return this.taskRepeatDetailsService.findOne(id);
  }

  @Mutation('updateTaskRepeatDetail')
  update(@Args('updateTaskRepeatDetailInput') updateTaskRepeatDetailInput: UpdateTaskRepeatDetailInput) {
    return this.taskRepeatDetailsService.update(updateTaskRepeatDetailInput.id, updateTaskRepeatDetailInput);
  }

  @Mutation('removeTaskRepeatDetail')
  remove(@Args('id') id: number) {
    return this.taskRepeatDetailsService.remove(id);
  }
}
