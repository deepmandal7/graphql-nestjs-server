import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetEntryService } from './timesheet_entry.service';

describe('TimesheetEntryService', () => {
  let service: TimesheetEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetEntryService],
    }).compile();

    service = module.get<TimesheetEntryService>(TimesheetEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
