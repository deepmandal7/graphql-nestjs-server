import { Field, InputType, ID, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
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

enum LeaveTypeEnum {
  ALL = 'ALL',
  PARTIAL = 'PARTIAL',
}

export class CreateTimeOffInput {
  @Field((type) => Int)
  @IsInt()
  timesheet_id: number;

  @Field((type) => Int)
  @IsInt()
  time_off_type_id: number;

  @Field((type) => Int)
  @IsInt()
  user_id: number;

  @Field((type) => LeaveTypeEnum)
  @IsEnum(LeaveTypeEnum)
  leave_type_enum: LeaveTypeEnum;

  @Field()
  from_date: string;

  @Field()
  @IsOptional()
  to_date: string;

  @Field()
  @IsOptional()
  from_time: string;

  @Field()
  @IsOptional()
  to_time: string;

  @Field()
  reason: string;

  @Field()
  @IsOptional()
  timezone: string;
}
