import { Field, InputType, ID, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
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

@InputType()
export class CreateTimesheetGeoLocationInput {
  @Field()
  site_name: String;

  @Field()
  site_address: String;

  @Field((type) => [Int])
  @IsOptional()
  jobs: number[];

  @Field((type) => Int)
  @IsInt()
  timesheets: number;

  @Field((type) => Int)
  @IsInt()
  created_by: number;
}
