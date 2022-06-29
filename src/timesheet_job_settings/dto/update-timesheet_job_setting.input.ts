import { CreateTimesheetJobSettingInput } from './create-timesheet_job_setting.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTimesheetJobSettingInput extends PartialType(CreateTimesheetJobSettingInput) {
  id: number;
}
