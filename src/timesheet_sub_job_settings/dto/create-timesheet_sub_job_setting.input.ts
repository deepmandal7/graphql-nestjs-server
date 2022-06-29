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

export class CreateTimesheetSubJobSettingInput {
  @Field()
  sub_job_title: String;

  @Field((type) => Boolean)
  @IsBoolean()
  @IsOptional()
  all_user: boolean;

  @Field((type) => [Int])
  @IsOptional()
  user: number[];

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  job_id: number;

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  geo_locations: number[];

  @Field((type) => Int)
  @IsInt()
  created_by: number;
}
