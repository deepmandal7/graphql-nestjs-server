import { CreateTimesheetGeoLocationInput } from './create-timesheet_geo_location.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTimesheetGeoLocationInput extends PartialType(CreateTimesheetGeoLocationInput) {
  id: number;
}
