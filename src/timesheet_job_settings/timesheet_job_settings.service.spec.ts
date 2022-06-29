import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetJobSettingsService } from './timesheet_job_settings.service';

describe('TimesheetJobSettingsService', () => {
  let service: TimesheetJobSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetJobSettingsService],
    }).compile();

    service = module.get<TimesheetJobSettingsService>(TimesheetJobSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
