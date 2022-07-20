import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EmployeeBreakPendingService } from './employee_break_pending.service';
import { CreateEmployeeBreakPendingInput } from './dto/create-employee_break_pending.input';
import { UpdateEmployeeBreakPendingInput } from './dto/update-employee_break_pending.input';
import { QueryEmployeeBreakPendingInput } from './dto/query-employee_break_pending.input';

@Resolver('EmployeeBreakPending')
export class EmployeeBreakPendingResolver {
  constructor(
    private readonly employeeBreakPendingService: EmployeeBreakPendingService,
  ) {}

  @Mutation('createEmployeeBreakPending')
  create(
    @Args('input')
    createEmployeeBreakPendingInput: CreateEmployeeBreakPendingInput,
  ) {
    return this.employeeBreakPendingService.create(
      createEmployeeBreakPendingInput,
    );
  }

  @Query('getAllEmployeeBreakPending')
  findAll(
    @Args('take') take: number,
    @Args('cursor') cursor: number,
    @Args('where')
    queryEmployeeBreakPendingInput: QueryEmployeeBreakPendingInput,
    @Args('orgId') orgId: number,
    @Args('searchText') searchText: string,
  ) {
    return this.employeeBreakPendingService.findAll(
      take,
      cursor ? { id: cursor } : null,
      queryEmployeeBreakPendingInput,
      orgId,
      searchText,
    );
  }

  @Query('getEmployeeBreakPending')
  findOne(@Args('id') id: number) {
    return this.employeeBreakPendingService.findOne(id);
  }

  @Mutation('updateEmployeeBreakPending')
  async update(
    @Args('input')
    updateEmployeeBreakPendingInput: UpdateEmployeeBreakPendingInput,
  ) {
    return await this.employeeBreakPendingService.update(
      updateEmployeeBreakPendingInput.id,
      updateEmployeeBreakPendingInput,
    );
  }

  @Mutation('removeEmployeeBreakPending')
  async remove(@Args('id') id: number) {
    return await this.employeeBreakPendingService.remove(id);
  }

  @Mutation('approveRejectEmployeeBreakPending')
  async approveReject(@Args('id') id: number, @Args('status') status: string) {
    return await this.employeeBreakPendingService.approveReject(id, status);
  }
}
