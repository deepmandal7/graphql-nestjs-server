import { Test, TestingModule } from '@nestjs/testing';
import { TimeEntryPendingService } from './time_entry_pending.service';

describe('TimeEntryPendingService', () => {
  let service: TimeEntryPendingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeEntryPendingService],
    }).compile();

    service = module.get<TimeEntryPendingService>(TimeEntryPendingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
