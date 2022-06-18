import { Test, TestingModule } from '@nestjs/testing';
import { WorkDurationsResolver } from './work_durations.resolver';
import { WorkDurationsService } from './work_durations.service';

describe('WorkDurationsResolver', () => {
  let resolver: WorkDurationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkDurationsResolver, WorkDurationsService],
    }).compile();

    resolver = module.get<WorkDurationsResolver>(WorkDurationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
