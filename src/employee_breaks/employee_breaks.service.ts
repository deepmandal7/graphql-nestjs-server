import { Injectable } from '@nestjs/common';
import { CreateEmployeeBreakInput } from './dto/create-employee_break.input';
import { UpdateEmployeeBreakInput } from './dto/update-employee_break.input';

@Injectable()
export class EmployeeBreaksService {
  create(createEmployeeBreakInput: CreateEmployeeBreakInput) {
    return 'This action adds a new employeeBreak';
  }

  findAll() {
    return `This action returns all employeeBreaks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeBreak`;
  }

  update(id: number, updateEmployeeBreakInput: UpdateEmployeeBreakInput) {
    return `This action updates a #${id} employeeBreak`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeBreak`;
  }
}
