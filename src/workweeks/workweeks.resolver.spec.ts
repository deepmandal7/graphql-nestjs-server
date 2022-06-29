import { Test, TestingModule } from '@nestjs/testing';
import { WorkweeksResolver } from './workweeks.resolver';
import { WorkweeksService } from './workweeks.service';

describe('WorkweeksResolver', () => {
  let resolver: WorkweeksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkweeksResolver, WorkweeksService],
    }).compile();

    resolver = module.get<WorkweeksResolver>(WorkweeksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
