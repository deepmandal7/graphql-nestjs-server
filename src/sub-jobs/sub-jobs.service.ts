import { Injectable } from '@nestjs/common';
import { CreateSubJobInput } from './dto/create-sub-job.input';
import { UpdateSubJobInput } from './dto/update-sub-job.input';

@Injectable()
export class SubJobsService {
  create(createSubJobInput: CreateSubJobInput) {
    return 'This action adds a new subJob';
  }

  findAll() {
    return `This action returns all subJobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subJob`;
  }

  update(id: number, updateSubJobInput: UpdateSubJobInput) {
    return `This action updates a #${id} subJob`;
  }

  remove(id: number) {
    return `This action removes a #${id} subJob`;
  }
}
