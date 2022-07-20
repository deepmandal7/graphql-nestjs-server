import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimeEntryPendingService } from './time_entry_pending.service';
import { CreateTimeEntryPendingInput } from './dto/create-time_entry_pending.input';
import { UpdateTimeEntryPendingInput } from './dto/update-time_entry_pending.input';
import { QueryTimeEntryPendingInput } from './dto/query-time_entry_pending.input';

@Resolver('TimeEntryPending')
export class TimeEntryPendingResolver {
  constructor(
    private readonly timeEntryPendingService: TimeEntryPendingService,
  ) {}

  @Mutation('createTimeEntryPending')
  async create(
    @Args('input')
    createTimeEntryPendingInput: CreateTimeEntryPendingInput,
  ) {
    return await this.timeEntryPendingService.create(
      createTimeEntryPendingInput,
    );
  }

  @Query('getAllTimeEntryPending')
  async findAll(
    @Args('take') take: number,
    @Args('cursor') cursor: number,
    @Args('where') queryTimeEntryPendingInput: QueryTimeEntryPendingInput,
    @Args('orgId') orgId: number,
    @Args('searchText') searchText: string,
  ) {
    return await this.timeEntryPendingService.findAll(
      take,
      cursor ? { id: cursor } : null,
      queryTimeEntryPendingInput,
      orgId,
      searchText,
    );
  }

  @Query('getTimeEntryPending')
  async findOne(@Args('id') id: number) {
    return await this.timeEntryPendingService.findOne(id);
  }

  @Mutation('updateTimeEntryPending')
  async update(
    @Args('input')
    updateTimeEntryPendingInput: UpdateTimeEntryPendingInput,
  ) {
    return await this.timeEntryPendingService.update(
      updateTimeEntryPendingInput.id,
      updateTimeEntryPendingInput,
    );
  }

  @Mutation('removeTimeEntryPending')
  async remove(@Args('id') id: number) {
    return await this.timeEntryPendingService.remove(id);
  }

  @Mutation('approveRejectTimeEntryPending')
  async approveReject(@Args('id') id: number, @Args('status') status: string) {
    return await this.timeEntryPendingService.approveReject(id, status);
  }
}
