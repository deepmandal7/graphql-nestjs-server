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
    console.log(createTaskInput.eyear ? `${createTaskInput.eyear}-${String(createTaskInput.emonth).padStart(2, "0")}-${String(createTaskInput.edate).padStart(2, "0")} ${String(createTaskInput.ehour).padStart(2, "0")}:${String(createTaskInput.eminute).padStart(2, "0")}` : null)
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
      ehour: createTaskInput.eyear || 0,
      eminute: createTaskInput.eyear || 0,
      task_coordinates: [parseFloat(createTaskInput.task_coordinates.split(",")[0]), parseFloat(createTaskInput.task_coordinates.split(",")[1])],
      task_location: createTaskInput.task_location,
      task_status: createTaskInput.task_status,
      created_by: createTaskInput.created_by,
      task_start_date_time: createTaskInput.syear ? `${createTaskInput.syear}-${String(createTaskInput.smonth).padStart(2, "0")}-${String(createTaskInput.sdate).padStart(2, "0")} ${String(createTaskInput.shour).padStart(2, "0")}:${String(createTaskInput.sminute).padStart(2, "0")}`: null,
      task_end_date_time: createTaskInput.eyear ? `${createTaskInput.eyear}-${String(createTaskInput.emonth).padStart(2, "0")}-${String(createTaskInput.edate).padStart(2, "0")} ${String(createTaskInput.ehour).padStart(2, "0")}:${String(createTaskInput.eminute).padStart(2, "0")}` : null,
      user_ids: createTaskInput.user_ids,
      task_tag: {
        createMany: {
          data: createTaskInput.tag_ids.map(item => {
            return {
              tag_id: item
            }
          })
        }
      },
      repeat_details: {
        create: createTaskInput.repeat_details
      },
      task_board: { connect: { id: createTaskInput.task_board_id } },
    });
  }

  @Query('tasks')
  async findAll(
    @Args('take') take: number,
    @Args('cursor') cursor: number,
    @Args('orgId') orgId: number,
    @Args('isUnassigned') isUnassigned: boolean,
    @Args('userIds') userIds: number[],
    @Args('dates') dates: string,
    @Args('startDates') startDates: string,
    @Args('fromStartYear') fromStartYear: number,
    @Args('fromStartMonth') fromStartMonth: number,
    @Args('fromStartDate') fromStartDate: number,
    @Args('toStartYear') toStartYear: number,
    @Args('toStartMonth') toStartMonth: number,
    @Args('toStartDate') toStartDate: number,
    @Args('taskStatus') taskStatus: string,
    @Args('tagIds') tagIds: number[],
    @Args('createdBy') createdBy: number,
  ) {
    return await this.taskService.findAll(
      take,
      cursor ? { id: cursor } : null, 
      orgId,
      isUnassigned,
      userIds,
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
      taskStatus
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
