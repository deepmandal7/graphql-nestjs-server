import { CreateTaskRepeatDetailInput } from './create-task_repeat_detail.input';
import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType, ID, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTaskRepeatDetailInput extends PartialType(
  CreateTaskRepeatDetailInput,
) {
  id: number;
}
