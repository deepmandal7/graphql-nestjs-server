import { CreateSubTaskInput } from './create-sub_task.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSubTaskInput extends PartialType(CreateSubTaskInput) {
  id: number;
}
