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
  IsObject,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

enum DayTypeEnum {
  CURRENT = 'CURRENT',
  NEXT = 'NEXT',
  PREVIOUS = 'PREVIOUS',
}

export class CreateTimeEntryPendingInput {
  @Field()
  check_in_time: string;

  @Field((type) => DayTypeEnum)
  @IsEnum(DayTypeEnum)
  check_in_day_type: DayTypeEnum;

  @Field()
  @IsOptional()
  check_out_time: string;

  @Field((type) => DayTypeEnum)
  @IsEnum(DayTypeEnum)
  @IsOptional()
  check_out_day_type: DayTypeEnum;

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  timesheet_jobs_id: number;

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  timesheet_sub_jobs_id: number;

  @Field()
  @IsOptional()
  comments: string;

  @Field()
  @IsOptional()
  timezone: string;

  @Field((type) => Int)
  @IsInt()
  created_by_id: number;

  @Field((type) => Int)
  @IsInt()
  time_entry_id: number;

  @Field((type) => Int)
  @IsInt()
  timesheet_id: number;

  @Field((type) => Int)
  @IsInt()
  timesheet_entry_id: number;
}
