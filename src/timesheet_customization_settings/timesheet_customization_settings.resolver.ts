import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimesheetCustomizationSettingsService } from './timesheet_customization_settings.service';
import { UpdateTimesheetCustomizationSettingInput } from './dto/update-timesheet_customization_setting.input';

@Resolver('TimesheetCustomizationSetting')
export class TimesheetCustomizationSettingsResolver {
  constructor(
    private readonly timesheetCustomizationSettingsService: TimesheetCustomizationSettingsService,
  ) {}

  @Query('getTimesheetCustomizationSetting')
  async findOne(@Args('timesheetId') timesheetId: number) {
    return await this.timesheetCustomizationSettingsService.findOne(
      timesheetId,
    );
  }

  @Mutation('updateTimesheetCustomizationSetting')
  async update(
    @Args('input')
    updateTimesheetCustomizationSettingInput: UpdateTimesheetCustomizationSettingInput,
  ) {
    return await this.timesheetCustomizationSettingsService.update(
      updateTimesheetCustomizationSettingInput.id,
      updateTimesheetCustomizationSettingInput,
    );
  }
}
