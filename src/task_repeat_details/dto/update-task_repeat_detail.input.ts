import { CreateTaskRepeatDetailInput } from './create-task_repeat_detail.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTaskRepeatDetailInput extends PartialType(CreateTaskRepeatDetailInput) {
  id: number;
}
