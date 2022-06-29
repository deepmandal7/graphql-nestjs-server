import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetGeoLocationsService } from './timesheet_geo_locations.service';

describe('TimesheetGeoLocationsService', () => {
  let service: TimesheetGeoLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetGeoLocationsService],
    }).compile();

    service = module.get<TimesheetGeoLocationsService>(TimesheetGeoLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
