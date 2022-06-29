import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetReminderSettingsService } from './timesheet_reminder_settings.service';

describe('TimesheetReminderSettingsService', () => {
  let service: TimesheetReminderSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetReminderSettingsService],
    }).compile();

    service = module.get<TimesheetReminderSettingsService>(TimesheetReminderSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
