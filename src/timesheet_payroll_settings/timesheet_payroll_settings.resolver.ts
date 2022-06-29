import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimesheetPayrollSettingsService } from './timesheet_payroll_settings.service';
import { UpdateTimesheetPayrollSettingInput } from './dto/update-timesheet_payroll_setting.input';

@Resolver('TimesheetPayrollSetting')
export class TimesheetPayrollSettingsResolver {
  constructor(
    private readonly timesheetPayrollSettingsService: TimesheetPayrollSettingsService,
  ) {}

  @Query('getTimesheetPayrollSetting')
  async findOne(@Args('timesheetId') timesheetId: number) {
    return await this.timesheetPayrollSettingsService.findOne(timesheetId);
  }

  @Mutation('updateTimesheetPayrollSetting')
  async update(
    @Args('input')
    updateTimesheetPayrollSettingInput: UpdateTimesheetPayrollSettingInput,
  ) {
    return await this.timesheetPayrollSettingsService.update(
      updateTimesheetPayrollSettingInput.id,
      updateTimesheetPayrollSettingInput,
    );
  }
}
