import { Module } from '@nestjs/common';
import { TaskRepeatDetailsService } from './task_repeat_details.service';
import { TaskRepeatDetailsResolver } from './task_repeat_details.resolver';

@Module({
  providers: [TaskRepeatDetailsResolver, TaskRepeatDetailsService]
})
export class TaskRepeatDetailsModule {}
