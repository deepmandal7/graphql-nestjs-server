import { Field, InputType, ID, Int } from '@nestjs/graphql';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsAlpha,
  IsAlphanumeric,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsLatLong,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTimesheetCustomizationSettingInput {
  @Field()
  @Type(() => Number)
  id: number;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  allow_clock_in_out_web_browser: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  allow_clock_in_out_mobile_app: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  allow_clock_in_out_no_shecduled_shift: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  allow_clock_in_out_mobile_app_timeclock: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  direct_clock_in_out_schedule: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  allow_clock_in_out_computer_timeclock: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  allow_manual_shift_records_addition: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  approval_manual_shift_records_addition: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  approval_manual_shift_records_deletion: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  approval_absence_addition: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  approval_cloking_out_outside_geofence: boolean;
}
