import { CreateShiftInput } from './create-shift.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateShiftInput extends PartialType(CreateShiftInput) {
  id: number;
}
