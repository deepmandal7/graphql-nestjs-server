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

  @Query('subTask')
  findAll() {
    return this.subTaskService.findAll();
  }

  @Mutation('updateSubTaskStatus')
  updateStatus(
    @Args('updateSubTaskStatusInput')
    updateSubTaskStatusInput: UpdateSubTaskInput,
  ) {
    let updateData: any = updateSubTaskStatusInput
    updateData.user_ids = {
      connect: updateSubTaskStatusInput.user_ids
        ? updateSubTaskStatusInput.user_ids.map((userId) => {
            return { id: userId };
          })
        : [],
    },
    return this.subTaskService.update(
      updateSubTaskStatusInput.id,
      updateSubTaskStatusInput,
    );
  }

  @Query('subTask')
  findOne(@Args('id') id: number) {
    return this.subTaskService.findOne(id);
  }

  @Mutation('updateSubTask')
  update(@Args('updateSubTaskInput') updateSubTaskInput: UpdateSubTaskInput) {
    return this.subTaskService.update(
      updateSubTaskInput.id,
      updateSubTaskInput,
    );
  }

  @Mutation('removeSubTask')
  remove(@Args('id') id: number) {
    return this.subTaskService.remove(id);
  }
}
