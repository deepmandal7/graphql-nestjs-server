import { Test, TestingModule } from '@nestjs/testing';
import { TaskBoardCustomisationResolver } from './task_board_customisation.resolver';
import { TaskBoardCustomisationService } from './task_board_customisation.service';

describe('TaskBoardCustomisationResolver', () => {
  let resolver: TaskBoardCustomisationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskBoardCustomisationResolver, TaskBoardCustomisationService],
    }).compile();

    resolver = module.get<TaskBoardCustomisationResolver>(TaskBoardCustomisationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
