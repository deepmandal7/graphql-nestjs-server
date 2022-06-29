import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetNotificationSettingsService } from './timesheet_notification_settings.service';

describe('TimesheetNotificationSettingsService', () => {
  let service: TimesheetNotificationSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetNotificationSettingsService],
    }).compile();

    service = module.get<TimesheetNotificationSettingsService>(TimesheetNotificationSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
