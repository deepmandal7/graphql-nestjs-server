import { CreateEmployeeBreakPendingInput } from './create-employee_break_pending.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEmployeeBreakPendingInput extends PartialType(CreateEmployeeBreakPendingInput) {
  id: number;
}
