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

enum RepeatTypeEnum {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export class SubTask {
  @IsString()
  task_description: string;

  @IsInt()
  @IsOptional()
  syear: number;
  @IsInt()
  @IsOptional()
  smonth: number;
  @IsInt()
  @IsOptional()
  sdate: number;
  @IsInt()
  @IsOptional()
  shour: number;
  @IsInt()
  @IsOptional()
  sminute: number;
  @IsInt()
  @IsOptional()
  eyear: number;
  @IsInt()
  @IsOptional()
  emonth: number;
  @IsInt()
  edate: number;
  @IsInt()
  @IsOptional()
  ehour: number;
  @IsInt()
  @IsOptional()
  eminute: number;
  @IsInt()
  @IsOptional()
  created_by: number;

  @IsOptional()
  user_ids: number[];
}

export class RepeatDetails {
  @IsInt()
  @IsOptional()
  task_id?: number;

  @IsDateString()
  @IsOptional()
  stop_repeat?: Date;

  @IsInt()
  @IsOptional()
  how_often_repeat: number;

  @IsAlpha()
  @IsOptional()
  repeat_type: RepeatTypeEnum;

  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  @IsOptional()
  day_of_week?: number[];

  @IsInt()
  @IsOptional()
  day_of_month?: number;

  @IsInt()
  @IsOptional()
  week_of_month?: number;

  @IsInt()
  @IsOptional()
  month_of_year?: number;
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

  @Field((type) => Int)
  @IsInt()
  task_board_id: number;

  @Field((type) => Int)
  @IsInt()
  created_by: number;

  @Field((type) => [Int])
  @IsOptional()
  tag_ids?: number[];

  @Field((type) => RepeatDetails)
  @IsOptional()
  repeat_details?: RepeatDetails;

  @Field((type) => [SubTask])
  @IsOptional()
  sub_task?: SubTask[];
}
