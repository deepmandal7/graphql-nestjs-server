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

@InputType()
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

  @Field((type) => Date)
  @IsDateString()
  @IsOptional()
  task_start_date_time: Date;

  @Field((type) => Date)
  @IsDateString()
  @IsOptional()
  task_end_date_time: Date;

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
