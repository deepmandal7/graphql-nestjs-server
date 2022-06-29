import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetSubJobSettingsService } from './timesheet_sub_job_settings.service';

describe('TimesheetSubJobSettingsService', () => {
  let service: TimesheetSubJobSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetSubJobSettingsService],
    }).compile();

    service = module.get<TimesheetSubJobSettingsService>(TimesheetSubJobSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
