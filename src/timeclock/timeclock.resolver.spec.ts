import { Test, TestingModule } from '@nestjs/testing';
import { TimeclockResolver } from './timeclock.resolver';
import { TimeclockService } from './timeclock.service';

describe('TimeclockResolver', () => {
  let resolver: TimeclockResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeclockResolver, TimeclockService],
    }).compile();

    resolver = module.get<TimeclockResolver>(TimeclockResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
