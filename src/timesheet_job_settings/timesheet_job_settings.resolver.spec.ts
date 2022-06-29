import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetJobSettingsResolver } from './timesheet_job_settings.resolver';
import { TimesheetJobSettingsService } from './timesheet_job_settings.service';

describe('TimesheetJobSettingsResolver', () => {
  let resolver: TimesheetJobSettingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetJobSettingsResolver, TimesheetJobSettingsService],
    }).compile();

    resolver = module.get<TimesheetJobSettingsResolver>(TimesheetJobSettingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
