import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubTaskService } from './sub_task.service';
import { CreateSubTaskInput } from './dto/create-sub_task.input';
import { UpdateSubTaskInput } from './dto/update-sub_task.input';

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
      syear: createSubTaskInput.syear,
      smonth: createSubTaskInput.smonth,
      sdate: createSubTaskInput.sdate,
      shour: createSubTaskInput.shour,
      sminute: createSubTaskInput.sminute,
      eyear: createSubTaskInput.eyear,
      emonth: createSubTaskInput.emonth,
      edate: createSubTaskInput.edate,
      ehour: createSubTaskInput.ehour,
      eminute: createSubTaskInput.eminute,
      sub_task_start_date_time: createSubTaskInput.syear
        ? `${createSubTaskInput.syear}-${String(
            createSubTaskInput.smonth,
          ).padStart(2, '0')}-${String(createSubTaskInput.sdate).padStart(
            2,
            '0',
          )} ${String(createSubTaskInput.shour).padStart(2, '0')}:${String(
            createSubTaskInput.sminute,
          ).padStart(2, '0')}`
        : null,
      sub_task_end_date_time: createSubTaskInput.eyear
        ? `${createSubTaskInput.eyear}-${String(
            createSubTaskInput.emonth,
          ).padStart(2, '0')}-${String(createSubTaskInput.edate).padStart(
            2,
            '0',
          )} ${String(createSubTaskInput.ehour).padStart(2, '0')}:${String(
            createSubTaskInput.eminute,
          ).padStart(2, '0')}`
        : null,
      created_by: createSubTaskInput.created_by,
      user_ids: {
        connect: createSubTaskInput.user_ids
          ? createSubTaskInput.user_ids.map((userId) => {
              return { id: userId };
            })
          : [],
      },
    });
  }

  @Query('subTasks')
  findAll() {
    return this.subTaskService.findAll();
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

    updateData.sub_task_start_date_time = `${updateData.syear}-${String(
      updateData.smonth,
    ).padStart(2, '0')}-${String(updateData.sdate).padStart(2, '0')} ${String(
      updateData.shour,
    ).padStart(2, '0')}:${String(updateData.sminute).padStart(2, '0')}`;

    updateData.sub_task_end_date_time = `${updateData.eyear}-${String(
      updateData.emonth,
    ).padStart(2, '0')}-${String(updateData.edate).padStart(2, '0')} ${String(
      updateData.ehour,
    ).padStart(2, '0')}:${String(updateData.eminute).padStart(2, '0')}`;

    updateData.user_ids.set = updateData.user_ids.map((id) => {
      return { id };
    });

    return this.subTaskService.update(updateSubTaskInput.id, updateData);
  }

  @Mutation('removeSubTask')
  remove(@Args('id') id: number) {
    return this.subTaskService.remove(id);
  }
}
