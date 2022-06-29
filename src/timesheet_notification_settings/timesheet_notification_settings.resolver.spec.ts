import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetNotificationSettingsResolver } from './timesheet_notification_settings.resolver';
import { TimesheetNotificationSettingsService } from './timesheet_notification_settings.service';

describe('TimesheetNotificationSettingsResolver', () => {
  let resolver: TimesheetNotificationSettingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetNotificationSettingsResolver, TimesheetNotificationSettingsService],
    }).compile();

    resolver = module.get<TimesheetNotificationSettingsResolver>(TimesheetNotificationSettingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
