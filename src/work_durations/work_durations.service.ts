import { Injectable } from '@nestjs/common';
import { CreateWorkDurationInput } from './dto/create-work_duration.input';
import { UpdateWorkDurationInput } from './dto/update-work_duration.input';

@Injectable()
export class WorkDurationsService {
  create(createWorkDurationInput: CreateWorkDurationInput) {
    return 'This action adds a new workDuration';
  }

  findAll() {
    return `This action returns all workDurations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workDuration`;
  }

  update(id: number, updateWorkDurationInput: UpdateWorkDurationInput) {
    return `This action updates a #${id} workDuration`;
  }

  remove(id: number) {
    return `This action removes a #${id} workDuration`;
  }
}
