import { Test, TestingModule } from '@nestjs/testing';
import { TaskBoardCustomisationService } from './task_board_customisation.service';

describe('TaskBoardCustomisationService', () => {
  let service: TaskBoardCustomisationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskBoardCustomisationService],
    }).compile();

    service = module.get<TaskBoardCustomisationService>(TaskBoardCustomisationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
