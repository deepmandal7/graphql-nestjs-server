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

enum PayPeriodCycleEnum {
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  HALFMONTHLY = 'HALFMONTHLY',
}

export class UpdateTimesheetPayrollSettingInput {
  @Field((type) => Int)
  @Type(() => Number)
  id: number;

  @Field((type) => PayPeriodCycleEnum)
  pay_period_cycle: PayPeriodCycleEnum;

  @Field((type) => Int)
  @Type(() => Number)
  start_day: number;

  @Field((type) => Int)
  @Type(() => Number)
  end_day: number;

  @Field((type) => Int)
  @Type(() => Number)
  payroll_processing_day: number;

  @Field((type) => Int)
  @Type(() => Number)
  payroll_report_generation_day: number;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  process_leave_encashment: Boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  lock: Boolean;
}
