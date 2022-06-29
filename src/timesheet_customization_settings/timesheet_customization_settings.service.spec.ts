import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetCustomizationSettingsService } from './timesheet_customization_settings.service';

describe('TimesheetCustomizationSettingsService', () => {
  let service: TimesheetCustomizationSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetCustomizationSettingsService],
    }).compile();

    service = module.get<TimesheetCustomizationSettingsService>(TimesheetCustomizationSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
