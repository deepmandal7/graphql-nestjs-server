import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetsGeneralSettingsService } from './timesheets_general_settings.service';

describe('TimesheetsGeneralSettingsService', () => {
  let service: TimesheetsGeneralSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetsGeneralSettingsService],
    }).compile();

    service = module.get<TimesheetsGeneralSettingsService>(TimesheetsGeneralSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
