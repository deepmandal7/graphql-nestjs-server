import { CreateTimesheetInput } from './create-timesheet.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTimesheetInput extends PartialType(CreateTimesheetInput) {
  id: number;
}
