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

  @Field((type) => Date)
  @IsDateString()
  @IsOptional()
  sub_task_start_date_time: Date;

  @Field((type) => Date)
  @IsDateString()
  @IsOptional()
  sub_task_end_date_time: Date;

  @Field((type) => Int)
  @IsInt()
  created_by: number;

  @Field((type) => [Int])
  user_ids: number[];
}
