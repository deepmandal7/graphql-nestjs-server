import { Test, TestingModule } from '@nestjs/testing';
import { TimeEntryPendingResolver } from './time_entry_pending.resolver';
import { TimeEntryPendingService } from './time_entry_pending.service';

describe('TimeEntryPendingResolver', () => {
  let resolver: TimeEntryPendingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeEntryPendingResolver, TimeEntryPendingService],
    }).compile();

    resolver = module.get<TimeEntryPendingResolver>(TimeEntryPendingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
