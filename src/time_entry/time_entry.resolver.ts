import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimeEntryService } from './time_entry.service';
import { CreateTimeEntryInput } from './dto/create-time_entry.input';
import { UpdateTimeEntryInput } from './dto/update-time_entry.input';
import { QueryTimeEntryInput } from './dto/query-time_entry.input';

@Resolver('TimeEntry')
export class TimeEntryResolver {
  constructor(private readonly timeEntryService: TimeEntryService) {}

  @Mutation('createTimeEntry')
  create(@Args('input') createTimeEntryInput: CreateTimeEntryInput) {
    return this.timeEntryService.create(createTimeEntryInput);
  }

  @Query('getAllTimeEntries')
  findAll(
    @Args('take') take: number,
    @Args('cursor') cursor: number,
    @Args('orgId') orgId: number,
    @Args('searchText') searchText: string,
    @Args('where') queryTimeEntryInput: QueryTimeEntryInput,
  ) {
    return this.timeEntryService.findAll(
      take,
      cursor ? { id: cursor } : null,
      orgId,
      searchText,
      queryTimeEntryInput,
    );
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
