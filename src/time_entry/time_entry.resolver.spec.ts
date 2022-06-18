import { Test, TestingModule } from '@nestjs/testing';
import { TimeEntryResolver } from './time_entry.resolver';
import { TimeEntryService } from './time_entry.service';

describe('TimeEntryResolver', () => {
  let resolver: TimeEntryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeEntryResolver, TimeEntryService],
    }).compile();

    resolver = module.get<TimeEntryResolver>(TimeEntryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
