import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetsGeneralSettingsResolver } from './timesheets_general_settings.resolver';
import { TimesheetsGeneralSettingsService } from './timesheets_general_settings.service';

describe('TimesheetsGeneralSettingsResolver', () => {
  let resolver: TimesheetsGeneralSettingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetsGeneralSettingsResolver, TimesheetsGeneralSettingsService],
    }).compile();

    resolver = module.get<TimesheetsGeneralSettingsResolver>(TimesheetsGeneralSettingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
