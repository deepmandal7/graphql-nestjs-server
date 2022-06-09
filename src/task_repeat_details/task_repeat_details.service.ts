import { Injectable } from '@nestjs/common';
import { CreateTaskRepeatDetailInput } from './dto/create-task_repeat_detail.input';
import { UpdateTaskRepeatDetailInput } from './dto/update-task_repeat_detail.input';

@Injectable()
export class TaskRepeatDetailsService {
  create(createTaskRepeatDetailInput: CreateTaskRepeatDetailInput) {
    return 'This action adds a new taskRepeatDetail';
  }

  findAll() {
    return `This action returns all taskRepeatDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskRepeatDetail`;
  }

  update(id: number, updateTaskRepeatDetailInput: UpdateTaskRepeatDetailInput) {
    return `This action updates a #${id} taskRepeatDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskRepeatDetail`;
  }
}
