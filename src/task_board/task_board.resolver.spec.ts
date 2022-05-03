import { Test, TestingModule } from '@nestjs/testing';
import { TaskBoardResolver } from './task_board.resolver';
import { TaskBoardService } from './task_board.service';

describe('TaskBoardResolver', () => {
  let resolver: TaskBoardResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskBoardResolver, TaskBoardService],
    }).compile();

    resolver = module.get<TaskBoardResolver>(TaskBoardResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
