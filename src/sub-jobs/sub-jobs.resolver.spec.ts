import { Test, TestingModule } from '@nestjs/testing';
import { SubJobsResolver } from './sub-jobs.resolver';
import { SubJobsService } from './sub-jobs.service';

describe('SubJobsResolver', () => {
  let resolver: SubJobsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubJobsResolver, SubJobsService],
    }).compile();

    resolver = module.get<SubJobsResolver>(SubJobsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
