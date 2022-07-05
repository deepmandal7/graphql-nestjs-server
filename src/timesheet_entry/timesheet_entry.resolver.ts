import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimesheetEntryService } from './timesheet_entry.service';
import { CreateTimesheetEntryInput } from './dto/create-timesheet_entry.input';
import { UpdateTimesheetEntryInput } from './dto/update-timesheet_entry.input';
import { QueryTimesheetEntryInput } from './dto/query-timesheet_entry.input';

@Resolver('TimesheetEntry')
export class TimesheetEntryResolver {
  constructor(private readonly timesheetEntryService: TimesheetEntryService) {}

  @Mutation('createTimesheetEntry')
  async create(
    @Args('input')
    createTimesheetEntryInput: CreateTimesheetEntryInput,
  ) {
    return await this.timesheetEntryService.create(createTimesheetEntryInput);
  }

  @Query('getAllTimesheetEntry')
  async findAll(
    @Args('take') take: number,
    @Args('cursor') cursor: number,
    @Args('orgId') orgId: number,
    @Args('searchText') searchText: string,
    @Args('where') queryTimesheetEntryInput: QueryTimesheetEntryInput,
  ) {
    return await this.timesheetEntryService.findAll(
      take,
      cursor ? { id: cursor } : null,
      orgId,
      searchText,
      queryTimesheetEntryInput,
    );
  }

  @Query('getTimesheetEntry')
  async findOne(@Args('id') id: number) {
    return await this.timesheetEntryService.findOne(id);
  }

  @Mutation('updateTimesheetEntry')
  async update(
    @Args('input')
    updateTimesheetEntryInput: UpdateTimesheetEntryInput,
  ) {
    return this.timesheetEntryService.update(
      updateTimesheetEntryInput.id,
      updateTimesheetEntryInput,
    );
  }

  @Mutation('removeTimesheetEntry')
  async remove(@Args('id') id: number) {
    return await this.timesheetEntryService.remove(id);
  }
}
