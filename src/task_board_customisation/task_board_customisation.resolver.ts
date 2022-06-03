import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskBoardCustomisationService } from './task_board_customisation.service';
import { CreateTaskBoardCustomisationInput } from './dto/create-task_board_customisation.input';
import { UpdateTaskBoardCustomisationInput } from './dto/update-task_board_customisation.input';

@Resolver('TaskBoardCustomisation')
export class TaskBoardCustomisationResolver {
  constructor(
    private readonly taskBoardCustomisationService: TaskBoardCustomisationService,
  ) {}

  @Query('taskBoardCustomisation')
  findOne(@Args('taskBoardId') taskBoardId: number) {
    return this.taskBoardCustomisationService.findOne(taskBoardId);
  }

  @Mutation('updateTaskBoardCustomisation')
  update(
    @Args('updateTaskBoardCustomisationInput')
    updateTaskBoardCustomisationInput: UpdateTaskBoardCustomisationInput,
  ) {
    return this.taskBoardCustomisationService.update(
      updateTaskBoardCustomisationInput.id,
      updateTaskBoardCustomisationInput,
    );
  }
}
