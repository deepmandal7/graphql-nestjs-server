import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubJobsService } from './sub-jobs.service';
import { CreateSubJobInput } from './dto/create-sub-job.input';
import { UpdateSubJobInput } from './dto/update-sub-job.input';

@Resolver('SubJob')
export class SubJobsResolver {
  constructor(private readonly subJobsService: SubJobsService) {}

  @Mutation('createSubJob')
  create(@Args('createSubJobInput') createSubJobInput: CreateSubJobInput) {
    return this.subJobsService.create(createSubJobInput);
  }

  @Query('subJobs')
  findAll() {
    return this.subJobsService.findAll();
  }

  @Query('subJob')
  findOne(@Args('id') id: number) {
    return this.subJobsService.findOne(id);
  }

  @Mutation('updateSubJob')
  update(@Args('updateSubJobInput') updateSubJobInput: UpdateSubJobInput) {
    return this.subJobsService.update(updateSubJobInput.id, updateSubJobInput);
  }

  @Mutation('removeSubJob')
  remove(@Args('id') id: number) {
    return this.subJobsService.remove(id);
  }
}
