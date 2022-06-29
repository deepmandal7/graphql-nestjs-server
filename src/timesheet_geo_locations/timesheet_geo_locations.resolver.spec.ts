import { Test, TestingModule } from '@nestjs/testing';
import { TimesheetGeoLocationsResolver } from './timesheet_geo_locations.resolver';
import { TimesheetGeoLocationsService } from './timesheet_geo_locations.service';

describe('TimesheetGeoLocationsResolver', () => {
  let resolver: TimesheetGeoLocationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimesheetGeoLocationsResolver, TimesheetGeoLocationsService],
    }).compile();

    resolver = module.get<TimesheetGeoLocationsResolver>(TimesheetGeoLocationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
