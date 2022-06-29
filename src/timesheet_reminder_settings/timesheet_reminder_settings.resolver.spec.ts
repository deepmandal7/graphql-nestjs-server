import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetReminderSettingsResolver } from './timesheet_reminder_settings.resolver';
import { TimesheetReminderSettingsService } from './timesheet_reminder_settings.service';

describe('TimesheetReminderSettingsResolver', () => {
  let resolver: TimesheetReminderSettingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetReminderSettingsResolver, TimesheetReminderSettingsService],
    }).compile();

    resolver = module.get<TimesheetReminderSettingsResolver>(TimesheetReminderSettingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
