import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimesheetNotificationSettingsService } from './timesheet_notification_settings.service';
import { UpdateTimesheetNotificationSettingInput } from './dto/update-timesheet_notification_setting.input';

@Resolver('TimesheetNotificationSetting')
export class TimesheetNotificationSettingsResolver {
  constructor(
    private readonly timesheetNotificationSettingsService: TimesheetNotificationSettingsService,
  ) {}

  @Query('getTimesheetNotificationSetting')
  async findOne(@Args('timesheetId') timesheetId: number) {
    return await this.timesheetNotificationSettingsService.findOne(timesheetId);
  }

  @Mutation('updateTimesheetNotificationSetting')
  async update(
    @Args('input')
    updateTimesheetNotificationSettingInput: UpdateTimesheetNotificationSettingInput,
  ) {
    return await this.timesheetNotificationSettingsService.update(
      updateTimesheetNotificationSettingInput.id,
      updateTimesheetNotificationSettingInput,
    );
  }
}
