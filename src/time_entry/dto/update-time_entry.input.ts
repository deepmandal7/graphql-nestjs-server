import { CreateTimeEntryInput } from './create-time_entry.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTimeEntryInput extends PartialType(CreateTimeEntryInput) {
  id: number;
}
