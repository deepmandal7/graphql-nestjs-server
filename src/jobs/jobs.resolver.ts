import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JobsService } from './jobs.service';
import { Job } from '../graphql';
import { job as JobType } from '@prisma/client';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';

@Resolver('Job')
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Mutation(() => Job)
  createJob(@Args('createJobInput') createJobInput: CreateJobInput): Promise<JobType> {
    console.log(createJobInput)
    return this.jobsService.create(createJobInput);
  }

  @Query('jobs')
  findAll(@Args('skip') skip: number,
          @Args('take') take: number,) {
    return this.jobsService.findAll(skip, take);
  }

  @Query('job')
  findOne(@Args('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Mutation('updateJob')
  update(@Args('updateJobInput') updateJobInput: UpdateJobInput) {
    return this.jobsService.update(updateJobInput.id, updateJobInput);
  }

  @Mutation('removeJob')
  remove(@Args('id') id: string) {
    return this.jobsService.remove(id);
  }
}
