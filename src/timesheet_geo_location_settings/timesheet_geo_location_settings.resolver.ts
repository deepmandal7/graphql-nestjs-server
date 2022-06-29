import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimesheetGeoLocationSettingsService } from './timesheet_geo_location_settings.service';
import { UpdateTimesheetGeoLocationSettingInput } from './dto/update-timesheet_geo_location_setting.input';

@Resolver('TimesheetGeoLocationSetting')
export class TimesheetGeoLocationSettingsResolver {
  constructor(
    private readonly timesheetGeoLocationSettingsService: TimesheetGeoLocationSettingsService,
  ) {}

  @Query('getTimesheetGeoLocationSetting')
  findOne(@Args('timesheetId') timesheetId: number) {
    return this.timesheetGeoLocationSettingsService.findOne(timesheetId);
  }

  @Mutation('updateTimesheetGeoLocationSetting')
  update(
    @Args('updateTimesheetGeoLocationSettingInput')
    updateTimesheetGeoLocationSettingInput: UpdateTimesheetGeoLocationSettingInput,
  ) {
    return this.timesheetGeoLocationSettingsService.update(
      updateTimesheetGeoLocationSettingInput.id,
      updateTimesheetGeoLocationSettingInput,
    );
  }
}
