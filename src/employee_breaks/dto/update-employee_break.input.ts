import { CreateEmployeeBreakInput } from './create-employee_break.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEmployeeBreakInput extends PartialType(CreateEmployeeBreakInput) {
  id: number;
}
