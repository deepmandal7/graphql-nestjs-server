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

enum RepeatTypeEnum {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export class CreateTaskRepeatDetailInput {
  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  task_id?: number;

  @Field((type) => Date)
  @IsDateString()
  @IsOptional()
  stop_repeat?: Date;

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  how_often_repeat: number;

  @Field((type) => RepeatTypeEnum)
  @IsEnum(RepeatTypeEnum)
  @IsOptional()
  repeat_type: RepeatTypeEnum;

  @Field((type) => [Int])
  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  @IsOptional()
  day_of_week?: number[];

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  day_of_month?: number;

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  week_of_month?: number;

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  month_of_year?: number;
}
