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
import { CreateWorkDurationInput } from '../../work_durations/dto/create-work_duration.input';

export class CreateTimeEntryInput {
  @Field((type) => Int)
  @IsInt()
  timesheet_id: number;

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  shift_id: number;

  @Field((type) => [Int])
  @IsOptional()
  employee_break: number[];

  @Field((type) => Date)
  @IsDateString()
  check_in_time: Date;

  @Field((type) => Date)
  @IsDateString()
  check_out_time: Date;

  @Field((type) => Int)
  @IsInt()
  user_id: number;

  @Field((type) => Int)
  @IsInt()
  org_id: number;
}
