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
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTimesheetSubJobSettingInput } from 'src/timesheet_sub_job_settings/dto/create-timesheet_sub_job_setting.input';

@InputType()
export class CreateTimesheetJobSettingInput {
  @Field()
  job_title: string;

  @Field()
  color: string;

  @Field()
  job_description: string;

  @Field((type) => Boolean)
  @IsOptional()
  all_user: boolean;

  @Field((type) => [Int])
  @IsArray()
  @IsOptional()
  user: number[];

  @Field((type) => Boolean)
  @IsOptional()
  sub_jobs_enabled: boolean;

  @Field((type) => Int)
  @IsInt()
  timesheets: number;

  @Field((type) => [Int])
  @IsOptional()
  geo_locations: number[];

  @Field((type) => [CreateTimesheetSubJobSettingInput])
  @IsOptional()
  timesheet_sub_jobs: CreateTimesheetSubJobSettingInput[];

  @Field((type) => Int)
  @IsInt()
  created_by: number;
}
