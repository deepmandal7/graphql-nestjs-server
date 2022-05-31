import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskCommentsService } from './task_comments.service';
import { CreateTaskCommentInput } from './dto/create-task_comment.input';
import { UpdateTaskCommentInput } from './dto/update-task_comment.input';
import { task_comments } from '@prisma/client';

@Resolver('TaskComment')
export class TaskCommentsResolver {
  constructor(private readonly taskCommentsService: TaskCommentsService) {}

  @Mutation('createTaskComment')
  create(
    @Args('createTaskCommentInput')
    createTaskCommentInput: CreateTaskCommentInput,
  ): Promise<task_comments> {
    return this.taskCommentsService.create({
      user_id: createTaskCommentInput.user_id,
      comment: createTaskCommentInput.comment,
      task: {
        connect: {
          id: createTaskCommentInput.task_id,
        },
      },
    });
  }

  @Query('taskComments')
  findAll(@Args('taskId') taskId: number): Promise<task_comments[]> {
    return this.taskCommentsService.findAll({
      where: {
        task_id: taskId,
      },
    });
  }

  @Query('taskComment')
  findOne(@Args('id') id: number): Promise<task_comments> {
    return this.taskCommentsService.findOne({
      id,
    });
  }

  @Mutation('updateTaskComment')
  update(
    @Args('updateTaskCommentInput')
    updateTaskCommentInput: UpdateTaskCommentInput,
  ): Promise<task_comments> {
    return this.taskCommentsService.update(
      updateTaskCommentInput.id,
      updateTaskCommentInput,
    );
  }

  @Mutation('removeTaskComment')
  remove(@Args('id') id: number): Promise<task_comments> {
    return this.taskCommentsService.remove(id);
  }
}
