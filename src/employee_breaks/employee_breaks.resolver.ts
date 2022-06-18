import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EmployeeBreaksService } from './employee_breaks.service';
import { CreateEmployeeBreakInput } from './dto/create-employee_break.input';
import { UpdateEmployeeBreakInput } from './dto/update-employee_break.input';

@Resolver('EmployeeBreak')
export class EmployeeBreaksResolver {
  constructor(private readonly employeeBreaksService: EmployeeBreaksService) {}

  @Mutation('createEmployeeBreak')
  create(@Args('createEmployeeBreakInput') createEmployeeBreakInput: CreateEmployeeBreakInput) {
    return this.employeeBreaksService.create(createEmployeeBreakInput);
  }

  @Query('employeeBreaks')
  findAll() {
    return this.employeeBreaksService.findAll();
  }

  @Query('employeeBreak')
  findOne(@Args('id') id: number) {
    return this.employeeBreaksService.findOne(id);
  }

  @Mutation('updateEmployeeBreak')
  update(@Args('updateEmployeeBreakInput') updateEmployeeBreakInput: UpdateEmployeeBreakInput) {
    return this.employeeBreaksService.update(updateEmployeeBreakInput.id, updateEmployeeBreakInput);
  }

  @Mutation('removeEmployeeBreak')
  remove(@Args('id') id: number) {
    return this.employeeBreaksService.remove(id);
  }
}
