import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimeEntryService } from './time_entry.service';
import { CreateTimeEntryInput } from './dto/create-time_entry.input';
import { UpdateTimeEntryInput } from './dto/update-time_entry.input';
import { QueryTimeEntryInput } from './dto/query-time_entry.input';

@Resolver('TimeEntry')
export class TimeEntryResolver {
  constructor(private readonly timeEntryService: TimeEntryService) {}

  @Mutation('createTimeEntry')
  async create(@Args('input') createTimeEntryInput: CreateTimeEntryInput) {
    return await this.timeEntryService.create(createTimeEntryInput);
  }

  @Mutation('updateTimeEntry')
  async update(@Args('input') updateTimeEntryInput: UpdateTimeEntryInput) {
    return await this.timeEntryService.update(
      updateTimeEntryInput.id,
      updateTimeEntryInput,
    );
  }

  @Mutation('removeTimeEntry')
  async remove(@Args('id') id: number) {
    return await this.timeEntryService.remove(id);
  }
}
