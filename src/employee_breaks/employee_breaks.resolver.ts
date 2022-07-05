import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EmployeeBreaksService } from './employee_breaks.service';
import { CreateEmployeeBreakInput } from './dto/create-employee_break.input';
import { UpdateEmployeeBreakInput } from './dto/update-employee_break.input';

@Resolver('EmployeeBreak')
export class EmployeeBreaksResolver {
  constructor(private readonly employeeBreaksService: EmployeeBreaksService) {}

  @Mutation('createEmployeeBreak')
  async create(
    @Args('input') createEmployeeBreakInput: CreateEmployeeBreakInput,
  ) {
    return await this.employeeBreaksService.create(createEmployeeBreakInput);
  }

  @Mutation('updateEmployeeBreak')
  async update(
    @Args('input')
    updateEmployeeBreakInput: UpdateEmployeeBreakInput,
  ) {
    return await this.employeeBreaksService.update(
      updateEmployeeBreakInput.id,
      updateEmployeeBreakInput,
    );
  }

  @Mutation('removeEmployeeBreak')
  async remove(@Args('id') id: number) {
    return await this.employeeBreaksService.remove(id);
  }
}
