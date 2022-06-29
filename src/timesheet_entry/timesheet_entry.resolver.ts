import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimesheetEntryService } from './timesheet_entry.service';
import { CreateTimesheetEntryInput } from './dto/create-timesheet_entry.input';
import { UpdateTimesheetEntryInput } from './dto/update-timesheet_entry.input';

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

  @Query('timesheetEntry')
  findAll() {
    return this.timesheetEntryService.findAll();
  }

  @Query('timesheetEntry')
  findOne(@Args('id') id: number) {
    return this.timesheetEntryService.findOne(id);
  }

  @Mutation('updateTimesheetEntry')
  update(
    @Args('updateTimesheetEntryInput')
    updateTimesheetEntryInput: UpdateTimesheetEntryInput,
  ) {
    return this.timesheetEntryService.update(
      updateTimesheetEntryInput.id,
      updateTimesheetEntryInput,
    );
  }

  @Mutation('removeTimesheetEntry')
  remove(@Args('id') id: number) {
    return this.timesheetEntryService.remove(id);
  }
}
