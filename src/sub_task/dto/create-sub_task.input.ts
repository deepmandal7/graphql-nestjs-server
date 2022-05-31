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

export class CreateSubTaskInput {
  @Field((type) => Int)
  @IsInt()
  task_id: number;

  @IsString()
  @Field()
  task_description: string;

  @IsInt()
  @Field((type) => Int)
  syear: number;

  @IsInt()
  @Field((type) => Int)
  smonth: number;

  @IsInt()
  @Field((type) => Int)
  sdate: number;

  @Field((type) => Int)
  @IsInt()
  shour: number;

  @Field((type) => Int)
  @IsInt()
  sminute: number;

  @Field((type) => Int)
  @IsInt()
  eyear: number;

  @Field((type) => Int)
  @IsInt()
  emonth: number;

  @Field((type) => Int)
  @IsInt()
  edate: number;

  @Field((type) => Int)
  @IsInt()
  ehour: number;

  @Field((type) => Int)
  @IsInt()
  eminute: number;

  @Field((type) => Int)
  @IsInt()
  created_by: number;

  user_ids: number[];
}
