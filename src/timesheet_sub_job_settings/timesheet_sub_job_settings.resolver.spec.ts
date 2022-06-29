import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetSubJobSettingsResolver } from './timesheet_sub_job_settings.resolver';
import { TimesheetSubJobSettingsService } from './timesheet_sub_job_settings.service';

describe('TimesheetSubJobSettingsResolver', () => {
  let resolver: TimesheetSubJobSettingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetSubJobSettingsResolver, TimesheetSubJobSettingsService],
    }).compile();

    resolver = module.get<TimesheetSubJobSettingsResolver>(TimesheetSubJobSettingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
