import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetEntryResolver } from './timesheet_entry.resolver';
import { TimesheetEntryService } from './timesheet_entry.service';

describe('TimesheetEntryResolver', () => {
  let resolver: TimesheetEntryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetEntryResolver, TimesheetEntryService],
    }).compile();

    resolver = module.get<TimesheetEntryResolver>(TimesheetEntryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
