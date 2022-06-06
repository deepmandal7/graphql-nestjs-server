import { CreateTaskInput } from './create-task.input';
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
  IsObject,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

enum TaskFrequencyEnum {
  ONEOFF = 'ONEOFF',
  RECURRING = 'RECURRING',
}

export class UpdateTaskInput {
  id: number;

  @Field()
  @Length(4, 20)
  @IsOptional()
  task_title: string;

  @Field()
  @Length(4, 50)
  @IsOptional()
  task_description: string;

  @Field((type) => [String])
  task_file_id: string[];

  @IsEnum(TaskFrequencyEnum)
  @Field((type) => TaskFrequencyEnum)
  task_frequency: TaskFrequencyEnum;

  @Field((type) => [Int])
  user_ids: number[];

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  syear: number;

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  smonth: number;

  @IsInt()
  @IsOptional()
  @Field((type) => Int)
  sdate: number;

  @IsInt()
  @IsOptional()
  @Field((type) => Int)
  shour: number;

  @IsInt()
  @IsOptional()
  @Field((type) => Int)
  sminute: number;

  @IsInt()
  @IsOptional()
  @Field((type) => Int)
  eyear: number;

  @IsInt()
  @IsOptional()
  @Field((type) => Int)
  emonth: number;

  @IsInt()
  @IsOptional()
  @Field((type) => Int)
  edate: number;

  @IsInt()
  @IsOptional()
  @Field((type) => Int)
  ehour: number;

  @IsInt()
  @IsOptional()
  @Field((type) => Int)
  eminute: number;

  @Field()
  @IsLatLong()
  @IsOptional()
  task_coordinates: string;

  @Field()
  @IsString()
  @IsOptional()
  task_location: string;

  @Field((type) => [Int])
  @IsOptional()
  tag_ids?: number[];
}
