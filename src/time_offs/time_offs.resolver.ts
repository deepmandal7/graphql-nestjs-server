import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimeOffsService } from './time_offs.service';
import { CreateTimeOffInput } from './dto/create-time_off.input';
import { UpdateTimeOffInput } from './dto/update-time_off.input';
import { QueryTimeOffInput } from './dto/query_time-off.input';

@Resolver('TimeOff')
export class TimeOffsResolver {
  constructor(private readonly timeOffsService: TimeOffsService) {}

  @Mutation('createTimeOff')
  async create(@Args('input') createTimeOffInput: CreateTimeOffInput) {
    return await this.timeOffsService.create(createTimeOffInput);
  }

  @Query('getAllTimeOffs')
  async findAll(
    @Args('take') take: number,
    @Args('cursor') cursor: number,
    @Args('orgId') orgId: number,
    @Args('searchText') searchText: string,
    @Args('where') queryTimeOffInput: QueryTimeOffInput,
  ) {
    return await this.timeOffsService.findAll(
      take,
      cursor ? { id: cursor } : null,
      queryTimeOffInput,
      orgId,
      searchText,
    );
  }

  @Query('getTimeOff')
  async findOne(@Args('id') id: number) {
    return await this.timeOffsService.findOne(id);
  }

  @Mutation('updateTimeOff')
  async update(@Args('input') updateTimeOffInput: UpdateTimeOffInput) {
    return await this.timeOffsService.update(
      updateTimeOffInput.id,
      updateTimeOffInput,
    );
  }

  @Mutation('removeTimeOff')
  async remove(@Args('id') id: number) {
    return await this.timeOffsService.remove(id);
  }
}
