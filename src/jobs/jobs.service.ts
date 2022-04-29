import { Injectable } from '@nestjs/common';
import { Prisma, job as JobType ,} from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}
  async create(createJobInput: Prisma.jobCreateInput): Promise<JobType> {
    console.log(createJobInput)
    return this.prisma.job.create({ data: createJobInput });
  }

  findAll(skip, takes) {
    return `This action returns all jobs`;
  }

  findOne(id: string) {
    return `This action returns a #${id} job`;
  }

  update(id: string, updateJobInput: UpdateJobInput) {
    return `This action updates a #${id} job`;
  }

  remove(id: string) {
    return `This action removes a #${id} job`;
  }
}
