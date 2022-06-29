import { PartialType } from '@nestjs/mapped-types';
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

enum WorkingHoursCalculationEnum {
  FIRSTLAST = 'FIRSTLAST',
  EVERY = 'EVERY',
}

enum MinimumHoursEnum {
  STRICT = 'STRICT',
  LENIENT = 'LENIENT',
}

enum ManualOrShiftMinimumHoursEnum {
  MANUAL = 'MANUAL',
  SHIFT = 'SHIFT',
}

enum PayrollExportTimeFormatEnum {
  DECIMAL = 'DECIMAL',
  MINUTES = 'MINUTES',
}

@InputType()
export class UpdateTimesheetsGeneralSettingInput {
  @Field((type) => Int)
  @Type(() => Number)
  id: number;

  @Field((type) => Int)
  @Type(() => Number)
  workweek_starts_on: number;

  @Field()
  daily_limit: string;

  @Field()
  auto_clock_out: string;

  @Field((type) => WorkingHoursCalculationEnum)
  working_hours_calculation: WorkingHoursCalculationEnum;

  @Field((type) => ManualOrShiftMinimumHoursEnum)
  // @IsEnum(ManualOrShiftMinimumHoursEnum)
  manual_or_shift_minimum_hours: ManualOrShiftMinimumHoursEnum;

  @Field()
  minimum_hours_manual_full_day: string;

  @Field()
  minimum_hours_manual_half_day: string;

  @Field((type) => PayrollExportTimeFormatEnum)
  // @IsEnum(PayrollExportTimeFormatEnum)
  payroll_export_time_format: PayrollExportTimeFormatEnum;

  @Field()
  timezone: string;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  restrict_clock_in: boolean;

  @Field((type) => Int)
  @Type(() => Number)
  restrict_clock_in_to: number;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  restrict_clock_out: boolean;

  @Field((type) => Int)
  @Type(() => Number)
  restrict_clock_out_to: number;
}
