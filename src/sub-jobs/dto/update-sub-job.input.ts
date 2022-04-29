import { CreateSubJobInput } from './create-sub-job.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSubJobInput extends PartialType(CreateSubJobInput) {
  id: number;
}
