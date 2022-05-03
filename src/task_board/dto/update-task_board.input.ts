import { CreateTaskBoardInput } from './create-task_board.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTaskBoardInput extends PartialType(CreateTaskBoardInput) {
  id: number;
}
