import { CreateTimeOffTypeInput } from './create-time_off_type.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTimeOffTypeInput extends PartialType(CreateTimeOffTypeInput) {
  id: number;
}
