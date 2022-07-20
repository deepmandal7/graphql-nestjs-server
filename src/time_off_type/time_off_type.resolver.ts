import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimeOffTypeService } from './time_off_type.service';
import { CreateTimeOffTypeInput } from './dto/create-time_off_type.input';
import { UpdateTimeOffTypeInput } from './dto/update-time_off_type.input';
import { QueryTimeOffTypeInput } from './dto/query-time_off_type.input';

@Resolver('TimeOffType')
export class TimeOffTypeResolver {
  constructor(private readonly timeOffTypeService: TimeOffTypeService) {}

  @Mutation('createTimeOffType')
  async create(
    @Args('input')
    createTimeOffTypeInput: CreateTimeOffTypeInput,
  ) {
    return await this.timeOffTypeService.create(createTimeOffTypeInput);
  }

  @Query('getAllTimeOffTypes')
  async findAll(
    @Args('take') take: number,
    @Args('cursor') cursor: number,
    @Args('where') queryTimeOffTypeInput: QueryTimeOffTypeInput,
    @Args('orgId') orgId: number,
    @Args('searchText') searchText: string,
  ) {
    return await this.timeOffTypeService.findAll(
      take,
      cursor ? { id: cursor } : null,
      queryTimeOffTypeInput,
      orgId,
      searchText,
    );
  }

  @Mutation('updateTimeOffType')
  async update(
    @Args('input')
    updateTimeOffTypeInput: UpdateTimeOffTypeInput,
  ) {
    return await this.timeOffTypeService.update(
      updateTimeOffTypeInput.id,
      updateTimeOffTypeInput,
    );
  }

  @Mutation('removeTimeOffType')
  async remove(@Args('id') id: number) {
    return await this.timeOffTypeService.remove(id);
  }
}
