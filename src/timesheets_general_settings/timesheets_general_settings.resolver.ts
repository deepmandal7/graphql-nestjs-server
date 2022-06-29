import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimesheetsGeneralSettingsService } from './timesheets_general_settings.service';
import { UpdateTimesheetsGeneralSettingInput } from './dto/update-timesheets_general_setting.input';

@Resolver('TimesheetsGeneralSetting')
export class TimesheetsGeneralSettingsResolver {
  constructor(
    private readonly timesheetsGeneralSettingsService: TimesheetsGeneralSettingsService,
  ) {}

  @Query('getTimesheetsGeneralSetting')
  async findOne(@Args('timesheetId') timesheetId: number) {
    return await this.timesheetsGeneralSettingsService.findOne(timesheetId);
  }

  @Mutation('updateTimesheetsGeneralSetting')
  update(
    @Args('input')
    updateTimesheetsGeneralSettingInput: UpdateTimesheetsGeneralSettingInput,
  ) {
    return this.timesheetsGeneralSettingsService.update(
      updateTimesheetsGeneralSettingInput.id,
      updateTimesheetsGeneralSettingInput,
    );
  }
}
