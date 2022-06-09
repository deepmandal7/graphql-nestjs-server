import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepeatDetailsResolver } from './task_repeat_details.resolver';
import { TaskRepeatDetailsService } from './task_repeat_details.service';

describe('TaskRepeatDetailsResolver', () => {
  let resolver: TaskRepeatDetailsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskRepeatDetailsResolver, TaskRepeatDetailsService],
    }).compile();

    resolver = module.get<TaskRepeatDetailsResolver>(TaskRepeatDetailsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
