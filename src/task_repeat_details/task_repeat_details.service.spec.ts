import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepeatDetailsService } from './task_repeat_details.service';

describe('TaskRepeatDetailsService', () => {
  let service: TaskRepeatDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskRepeatDetailsService],
    }).compile();

    service = module.get<TaskRepeatDetailsService>(TaskRepeatDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
