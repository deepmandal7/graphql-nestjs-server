import { CreateTimeclockInput } from './create-timeclock.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTimeclockInput extends PartialType(CreateTimeclockInput) {
  id: number;
}
