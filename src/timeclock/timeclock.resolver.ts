import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimeclockService } from './timeclock.service';
import { CreateTimeclockInput } from './dto/create-timeclock.input';
import { UpdateTimeclockInput } from './dto/update-timeclock.input';

@Resolver('Timeclock')
export class TimeclockResolver {
  constructor(private readonly timeclockService: TimeclockService) {}

  @Mutation('createTimeclock')
  create(@Args('createTimeclockInput') createTimeclockInput: CreateTimeclockInput) {
    return this.timeclockService.create(createTimeclockInput);
  }

  @Query('timeclock')
  findAll() {
    return this.timeclockService.findAll();
  }

  @Query('timeclock')
  findOne(@Args('id') id: number) {
    return this.timeclockService.findOne(id);
  }

  @Mutation('updateTimeclock')
  update(@Args('updateTimeclockInput') updateTimeclockInput: UpdateTimeclockInput) {
    return this.timeclockService.update(updateTimeclockInput.id, updateTimeclockInput);
  }

  @Mutation('removeTimeclock')
  remove(@Args('id') id: number) {
    return this.timeclockService.remove(id);
  }
}
