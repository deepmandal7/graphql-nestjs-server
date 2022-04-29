import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JobsService } from './jobs.service';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';

@Resolver('Job')
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Mutation('createJob')
  create(@Args('createJobInput') createJobInput: CreateJobInput) {
    return this.jobsService.create(createJobInput);
  }

  @Query('jobs')
  findAll() {
    return this.jobsService.findAll();
  }

  @Query('job')
  findOne(@Args('id') id: number) {
    return this.jobsService.findOne(id);
  }

  @Mutation('updateJob')
  update(@Args('updateJobInput') updateJobInput: UpdateJobInput) {
    return this.jobsService.update(updateJobInput.id, updateJobInput);
  }

  @Mutation('removeJob')
  remove(@Args('id') id: number) {
    return this.jobsService.remove(id);
  }
}
