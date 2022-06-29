import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimesheetJobSettingsService } from './timesheet_job_settings.service';
import { CreateTimesheetJobSettingInput } from './dto/create-timesheet_job_setting.input';
import { UpdateTimesheetJobSettingInput } from './dto/update-timesheet_job_setting.input';
import { QueryTimesheetJobSettingsInput } from './dto/query-timesheet_job_setting.input';

@Resolver('TimesheetJobSetting')
export class TimesheetJobSettingsResolver {
  constructor(
    private readonly timesheetJobSettingsService: TimesheetJobSettingsService,
  ) {}

  @Mutation('createTimesheetJobSetting')
  async create(
    @Args('input')
    createTimesheetJobSettingInput: CreateTimesheetJobSettingInput,
  ) {
    return await this.timesheetJobSettingsService.create(
      createTimesheetJobSettingInput,
    );
  }

  @Query('getAllTimesheetJobSettings')
  async findAll(
    @Args('take') take: number,
    @Args('cursor') cursor: number,
    @Args('orgId') orgId: number,
    @Args('searchText') searchText: string,
    @Args('where')
    queryTimesheetJobSettingsInput: QueryTimesheetJobSettingsInput,
  ) {
    return await this.timesheetJobSettingsService.findAll(
      take,
      cursor ? { id: cursor } : null,
      orgId,
      searchText,
      queryTimesheetJobSettingsInput,
    );
  }

  @Query('getTimesheetJobSetting')
  findOne(@Args('id') id: number) {
    return this.timesheetJobSettingsService.findOne(id);
  }

  @Mutation('updateTimesheetJobSetting')
  update(
    @Args('input')
    updateTimesheetJobSettingInput: UpdateTimesheetJobSettingInput,
  ) {
    return this.timesheetJobSettingsService.update(
      updateTimesheetJobSettingInput.id,
      updateTimesheetJobSettingInput,
    );
  }

  @Mutation('removeTimesheetJobSetting')
  remove(@Args('id') id: number) {
    return this.timesheetJobSettingsService.remove(id);
  }
}
