import { CreateTimeEntryPendingInput } from './create-time_entry_pending.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTimeEntryPendingInput extends PartialType(CreateTimeEntryPendingInput) {
  id: number;
}
