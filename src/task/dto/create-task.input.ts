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
import { CreateTaskRepeatDetailInput } from '../../task_repeat_details/dto/create-task_repeat_detail.input';

enum TaskFrequencyEnum {
  ONEOFF = 'ONEOFF',
  RECURRING = 'RECURRING',
}

export class SubTask {
  @IsString()
  task_description: string;

  @Field((type) => Date)
  @IsDateString()
  @IsOptional()
  sub_task_start_date_time: Date;

  @Field((type) => Date)
  @IsDateString()
  @IsOptional()
  sub_task_end_date_time: Date;
  @IsInt()
  @IsOptional()
  created_by: number;

  @IsOptional()
  user_ids: number[];
}

@InputType()
export class CreateTaskInput {
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

  @Field((type) => Int)
  @IsInt()
  task_board_id: number;

  @Field((type) => Int)
  @IsInt()
  created_by: number;

  @Field((type) => [Int])
  @IsOptional()
  tag_ids?: number[];

  @Field((type) => CreateTaskRepeatDetailInput)
  @IsOptional()
  repeat_details?: CreateTaskRepeatDetailInput;

  @Field((type) => [SubTask])
  @IsOptional()
  sub_task?: SubTask[];
}
