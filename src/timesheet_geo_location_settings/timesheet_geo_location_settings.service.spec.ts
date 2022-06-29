import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetGeoLocationSettingsService } from './timesheet_geo_location_settings.service';

describe('TimesheetGeoLocationSettingsService', () => {
  let service: TimesheetGeoLocationSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetGeoLocationSettingsService],
    }).compile();

    service = module.get<TimesheetGeoLocationSettingsService>(TimesheetGeoLocationSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
