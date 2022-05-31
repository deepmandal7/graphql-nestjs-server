import { Test, TestingModule } from '@nestjs/testing';
import { SubTaskResolver } from './sub_task.resolver';
import { SubTaskService } from './sub_task.service';

describe('SubTaskResolver', () => {
  let resolver: SubTaskResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubTaskResolver, SubTaskService],
    }).compile();

    resolver = module.get<SubTaskResolver>(SubTaskResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
