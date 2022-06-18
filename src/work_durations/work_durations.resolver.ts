import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WorkDurationsService } from './work_durations.service';
import { CreateWorkDurationInput } from './dto/create-work_duration.input';
import { UpdateWorkDurationInput } from './dto/update-work_duration.input';

@Resolver('WorkDuration')
export class WorkDurationsResolver {
  constructor(private readonly workDurationsService: WorkDurationsService) {}

  @Mutation('createWorkDuration')
  create(
    @Args('createWorkDurationInput')
    createWorkDurationInput: CreateWorkDurationInput,
  ) {
    return this.workDurationsService.create(createWorkDurationInput);
  }

  @Query('getWorkDurations')
  findAll() {
    return this.workDurationsService.findAll();
  }

  @Query('getWorkDuration')
  findOne(@Args('id') id: number) {
    return this.workDurationsService.findOne(id);
  }

  @Mutation('updateWorkDuration')
  update(
    @Args('updateWorkDurationInput')
    updateWorkDurationInput: UpdateWorkDurationInput,
  ) {
    return this.workDurationsService.update(
      updateWorkDurationInput.id,
      updateWorkDurationInput,
    );
  }

  @Mutation('removeWorkDuration')
  remove(@Args('id') id: number) {
    return this.workDurationsService.remove(id);
  }
}
