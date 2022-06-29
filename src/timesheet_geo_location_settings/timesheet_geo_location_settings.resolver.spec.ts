import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetGeoLocationSettingsResolver } from './timesheet_geo_location_settings.resolver';
import { TimesheetGeoLocationSettingsService } from './timesheet_geo_location_settings.service';

describe('TimesheetGeoLocationSettingsResolver', () => {
  let resolver: TimesheetGeoLocationSettingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetGeoLocationSettingsResolver, TimesheetGeoLocationSettingsService],
    }).compile();

    resolver = module.get<TimesheetGeoLocationSettingsResolver>(TimesheetGeoLocationSettingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
