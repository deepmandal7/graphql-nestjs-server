import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimesheetSubJobSettingsService } from './timesheet_sub_job_settings.service';
import { CreateTimesheetSubJobSettingInput } from './dto/create-timesheet_sub_job_setting.input';
import { UpdateTimesheetSubJobSettingInput } from './dto/update-timesheet_sub_job_setting.input';

@Resolver('TimesheetSubJobSetting')
export class TimesheetSubJobSettingsResolver {
  constructor(
    private readonly timesheetSubJobSettingsService: TimesheetSubJobSettingsService,
  ) {}

  @Mutation('createTimesheetSubJobSetting')
  async create(
    @Args('input')
    createTimesheetSubJobSettingInput: CreateTimesheetSubJobSettingInput,
  ) {
    return await this.timesheetSubJobSettingsService.create(
      createTimesheetSubJobSettingInput,
    );
  }

  @Query('getAllTimesheetSubJobSettings')
  async findAll(@Args('jobId') jobId: number) {
    return await this.timesheetSubJobSettingsService.findAll(jobId);
  }

  @Query('getTimesheetSubJobSetting')
  async findOne(@Args('id') id: number) {
    return await this.timesheetSubJobSettingsService.findOne(id);
  }

  @Mutation('updateTimesheetSubJobSetting')
  async update(
    @Args('input')
    updateTimesheetSubJobSettingInput: UpdateTimesheetSubJobSettingInput,
  ) {
    return await this.timesheetSubJobSettingsService.update(
      updateTimesheetSubJobSettingInput.id,
      updateTimesheetSubJobSettingInput,
    );
  }

  @Mutation('removeTimesheetSubJobSetting')
  async remove(@Args('id') id: number) {
    return await this.timesheetSubJobSettingsService.remove(id);
  }
}
