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

export class CreateEmployeeBreakInput {
  @Field((type) => Int)
  @IsInt()
  timesheet_manual_breaks_id: number;

  @Field((type) => Int)
  @IsInt()
  timesheet_entry_id: number;

  @Field((type) => Int)
  @IsInt()
  duration: number;

  @Field()
  start_time: string;

  @Field((type) => DayTypeEnum)
  @IsEnum(DayTypeEnum)
  start_day_type: DayTypeEnum;

  @Field()
  @IsOptional()
  end_time: string;

  @Field()
  @IsOptional()
  timezone: string;

  @Field((type) => DayTypeEnum)
  @IsEnum(DayTypeEnum)
  @IsOptional()
  end_day_type: DayTypeEnum;
}
