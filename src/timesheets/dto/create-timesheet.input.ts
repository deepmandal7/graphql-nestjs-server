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

@InputType()
export class CreateTimesheetInput {
  @Field()
  timeclock_name: string;

  @Field((type) => Boolean)
  @IsBoolean()
  @IsOptional()
  assign_to_all: Boolean;

  @Field((type) => [Int])
  @IsOptional()
  group_ids: number[];

  @Field((type) => Int)
  org: number;

  @IsInt()
  @Field((type) => Int)
  created_by: number;
}
