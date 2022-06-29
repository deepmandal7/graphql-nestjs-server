import { CreateTimesheetSubJobSettingInput } from './create-timesheet_sub_job_setting.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTimesheetSubJobSettingInput extends PartialType(CreateTimesheetSubJobSettingInput) {
  id: number;
}
