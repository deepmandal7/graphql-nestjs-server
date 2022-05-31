import { Test, TestingModule } from '@nestjs/testing';
import { TaskCommentsResolver } from './task_comments.resolver';
import { TaskCommentsService } from './task_comments.service';

describe('TaskCommentsResolver', () => {
  let resolver: TaskCommentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskCommentsResolver, TaskCommentsService],
    }).compile();

    resolver = module.get<TaskCommentsResolver>(TaskCommentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
