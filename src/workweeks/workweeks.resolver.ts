import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WorkweeksService } from './workweeks.service';
import { UpdateWorkweekInput } from './dto/update-workweek.input';

@Resolver('Workweek')
export class WorkweeksResolver {
  constructor(private readonly workweeksService: WorkweeksService) {}

  @Query('getWorkweek')
  async findOne(@Args('timesheetId') timesheetId: number) {
    return await this.workweeksService.findOne(timesheetId);
  }

  @Mutation('updateWorkweek')
  async update(@Args('input') updateWorkweekInput: UpdateWorkweekInput) {
    return await this.workweeksService.update(
      updateWorkweekInput.id,
      updateWorkweekInput,
    );
  }
}
