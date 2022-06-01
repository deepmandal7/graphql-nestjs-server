import { Injectable } from '@nestjs/common';
import { CreateTimeclockInput } from './dto/create-timeclock.input';
import { UpdateTimeclockInput } from './dto/update-timeclock.input';

@Injectable()
export class TimeclockService {
  create(createTimeclockInput: CreateTimeclockInput) {
    return 'This action adds a new timeclock';
  }

  findAll() {
    return `This action returns all timeclock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timeclock`;
  }

  update(id: number, updateTimeclockInput: UpdateTimeclockInput) {
    return `This action updates a #${id} timeclock`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeclock`;
  }
}
