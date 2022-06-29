import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimesheetReminderSettingsService } from './timesheet_reminder_settings.service';
import { UpdateTimesheetReminderSettingInput } from './dto/update-timesheet_reminder_setting.input';

@Resolver('TimesheetReminderSetting')
export class TimesheetReminderSettingsResolver {
  constructor(
    private readonly timesheetReminderSettingsService: TimesheetReminderSettingsService,
  ) {}

  @Query('getTimesheetReminderSetting')
  async findOne(@Args('timesheetId') timesheetId: number) {
    return await this.timesheetReminderSettingsService.findOne(timesheetId);
  }

  @Mutation('updateTimesheetReminderSetting')
  async update(
    @Args('input')
    updateTimesheetReminderSettingInput: UpdateTimesheetReminderSettingInput,
  ) {
    return await this.timesheetReminderSettingsService.update(
      updateTimesheetReminderSettingInput.id,
      updateTimesheetReminderSettingInput,
    );
  }
}
