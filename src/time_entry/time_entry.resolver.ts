import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimeEntryService } from './time_entry.service';
import { CreateTimeEntryInput } from './dto/create-time_entry.input';
import { UpdateTimeEntryInput } from './dto/update-time_entry.input';

@Resolver('TimeEntry')
export class TimeEntryResolver {
  constructor(private readonly timeEntryService: TimeEntryService) {}

  @Mutation('createTimeEntry')
  create(
    @Args('createTimeEntryInput') createTimeEntryInput: CreateTimeEntryInput,
  ) {
    return this.timeEntryService.create(createTimeEntryInput);
  }

  @Query('getAllTimeEntries')
  findAll() {
    return this.timeEntryService.findAll();
  }

  @Query('getTimeEntry')
  findOne(@Args('id') id: number) {
    return this.timeEntryService.findOne(id);
  }

  @Mutation('updateTimeEntry')
  update(
    @Args('updateTimeEntryInput') updateTimeEntryInput: UpdateTimeEntryInput,
  ) {
    return this.timeEntryService.update(
      updateTimeEntryInput.id,
      updateTimeEntryInput,
    );
  }

  @Mutation('removeTimeEntry')
  remove(@Args('id') id: number) {
    return this.timeEntryService.remove(id);
  }
}
