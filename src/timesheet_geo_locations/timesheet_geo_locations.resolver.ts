import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimesheetGeoLocationsService } from './timesheet_geo_locations.service';
import { CreateTimesheetGeoLocationInput } from './dto/create-timesheet_geo_location.input';
import { UpdateTimesheetGeoLocationInput } from './dto/update-timesheet_geo_location.input';
import { QueryTimesheetGeoLocationInput } from './dto/query-timesheet_geo_location.input';

@Resolver('TimesheetGeoLocation')
export class TimesheetGeoLocationsResolver {
  constructor(
    private readonly timesheetGeoLocationsService: TimesheetGeoLocationsService,
  ) {}

  @Mutation('createTimesheetGeoLocation')
  async create(
    @Args('input')
    createTimesheetGeoLocationInput: CreateTimesheetGeoLocationInput,
  ) {
    return await this.timesheetGeoLocationsService.create(
      createTimesheetGeoLocationInput,
    );
  }

  @Query('getAllTimesheetGeoLocations')
  async findAll(
    @Args('take') take: number,
    @Args('cursor') cursor: number,
    @Args('orgId') orgId: number,
    @Args('searchText') searchText: string,
    @Args('where')
    queryTimesheetGeoLocationInput: QueryTimesheetGeoLocationInput,
  ) {
    return await this.timesheetGeoLocationsService.findAll(
      take,
      cursor ? { id: cursor } : null,
      orgId,
      searchText,
      queryTimesheetGeoLocationInput,
    );
  }

  @Query('getTimesheetGeoLocation')
  async findOne(@Args('id') id: number) {
    return await this.timesheetGeoLocationsService.findOne(id);
  }

  @Mutation('updateTimesheetGeoLocation')
  async update(
    @Args('input')
    updateTimesheetGeoLocationInput: UpdateTimesheetGeoLocationInput,
  ) {
    return await this.timesheetGeoLocationsService.update(
      updateTimesheetGeoLocationInput.id,
      updateTimesheetGeoLocationInput,
    );
  }

  @Mutation('removeTimesheetGeoLocation')
  async remove(@Args('id') id: number) {
    return await this.timesheetGeoLocationsService.remove(id);
  }
}
