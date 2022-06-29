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

export class UpdateTimesheetReminderSettingInput {
  @Field()
  @Type(() => Number)
  id: number;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  before_start_enabled: boolean;

  @Field()
  @Type(() => Number)
  before_start: number;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  after_start_enabled: boolean;

  @Field()
  @Type(() => Number)
  after_start: number;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  before_end_enabled: boolean;

  @Field()
  @Type(() => Number)
  before_end: number;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  after_end_enabled: boolean;

  @Field()
  @Type(() => Number)
  after_end: number;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  no_check_in_enabled: boolean;

  @Field()
  @Type(() => Number)
  no_check_in_after: number;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  no_check_out_enabled: boolean;

  @Field()
  @Type(() => Number)
  no_check_out_after: number;
}
