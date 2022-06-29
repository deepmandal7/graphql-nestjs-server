import { CreateTimesheetEntryInput } from './create-timesheet_entry.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTimesheetEntryInput extends PartialType(CreateTimesheetEntryInput) {
  id: number;
}
