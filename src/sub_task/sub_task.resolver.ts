import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubTaskService } from './sub_task.service';
import { CreateSubTaskInput } from './dto/create-sub_task.input';
import { UpdateSubTaskInput } from './dto/update-sub_task.input';
import {
  digitsToDateTime,
  mapIDArrayToEnum,
} from '../common/utils/common_utils';

@Resolver('SubTask')
export class SubTaskResolver {
  constructor(private readonly subTaskService: SubTaskService) {}

  @Mutation('createSubTask')
  create(@Args('createSubTaskInput') createSubTaskInput: CreateSubTaskInput) {
    return this.subTaskService.create({
      task: {
        connect: {
          id: createSubTaskInput.task_id,
        },
      },
      task_description: createSubTaskInput.task_description,
      sub_task_start_date_time: createSubTaskInput.sub_task_start_date_time,
      sub_task_end_date_time: createSubTaskInput.sub_task_end_date_time,
      created_by: createSubTaskInput.created_by,
      user_ids: {
        connect: createSubTaskInput.user_ids
          ? mapIDArrayToEnum(createSubTaskInput.user_ids)
          : [],
      },
    });
  }

  @Query('subTasks')
  findAll(@Args('taskId') taskId: number) {
    return this.subTaskService.findAll(taskId);
  }

  @Query('subTask')
  findOne(@Args('id') id: number) {
    return this.subTaskService.findOne(id);
  }

  @Query('userSubTasks')
  findUserSubTasks(@Args('userId') userId: number) {
    return this.subTaskService.findUserSubTasks(userId);
  }

  @Mutation('updateSubTask')
  update(@Args('updateSubTaskInput') updateSubTaskInput: UpdateSubTaskInput) {
    let updateData: any = updateSubTaskInput;

    updateData.user_ids.set = mapIDArrayToEnum(updateData.user_ids);

    return this.subTaskService.update(updateSubTaskInput.id, updateData);
  }

  @Mutation('removeSubTask')
  remove(@Args('id') id: number) {
    return this.subTaskService.remove(id);
  }
}
