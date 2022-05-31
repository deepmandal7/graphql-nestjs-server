import { CreateTaskCommentInput } from './create-task_comment.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTaskCommentInput extends PartialType(CreateTaskCommentInput) {
  id: number;
}
