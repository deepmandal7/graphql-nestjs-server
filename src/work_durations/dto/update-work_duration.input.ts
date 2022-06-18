import { CreateWorkDurationInput } from './create-work_duration.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateWorkDurationInput extends PartialType(CreateWorkDurationInput) {
  id: number;
}
