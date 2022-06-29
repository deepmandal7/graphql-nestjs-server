import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetCustomizationSettingsResolver } from './timesheet_customization_settings.resolver';
import { TimesheetCustomizationSettingsService } from './timesheet_customization_settings.service';

describe('TimesheetCustomizationSettingsResolver', () => {
  let resolver: TimesheetCustomizationSettingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetCustomizationSettingsResolver, TimesheetCustomizationSettingsService],
    }).compile();

    resolver = module.get<TimesheetCustomizationSettingsResolver>(TimesheetCustomizationSettingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
