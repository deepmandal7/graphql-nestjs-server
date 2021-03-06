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

export class CreateShiftInput {
  @Field()
  start_date: string;

  @Field()
  end_date: string;

  @Field()
  start_time: string;

  @Field()
  end_time: string;

  @Field((type) => Int)
  @IsInt()
  timesheet_id: number;

  @Field((type) => Int)
  @IsInt()
  user_id: number;

  @Field((type) => Int)
  @IsInt()
  timesheet_jobs_id: number;

  @Field((type) => Int)
  @IsInt()
  timesheet_sub_jobs_id: number;

  @Field()
  timezone: string;

  @Field((type) => Int)
  @IsInt()
  created_by_id: number;
}
