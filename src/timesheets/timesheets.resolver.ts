import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimesheetsService } from './timesheets.service';
import { CreateTimesheetInput } from './dto/create-timesheet.input';
import { UpdateTimesheetInput } from './dto/update-timesheet.input';

@Resolver('Timesheet')
export class TimesheetsResolver {
  constructor(private readonly timesheetsService: TimesheetsService) {}

  @Mutation('createTimesheet')
  async create(@Args('input') createTimesheetInput: CreateTimesheetInput) {
    return await this.timesheetsService.create(createTimesheetInput);
  }

  @Query('getAllTimesheets')
  async findAll(@Args('orgId') orgId: number) {
    return await this.timesheetsService.findAll(orgId);
  }

  @Query('getTimesheet')
  findOne(@Args('id') id: number) {
    return this.timesheetsService.findOne(id);
  }

  @Mutation('updateTimesheet')
  update(@Args('input') updateTimesheetInput: UpdateTimesheetInput) {
    return this.timesheetsService.update(
      updateTimesheetInput.id,
      updateTimesheetInput,
    );
  }

  @Mutation('removeTimesheet')
  remove(@Args('id') id: number) {
    return this.timesheetsService.remove(id);
  }
}
