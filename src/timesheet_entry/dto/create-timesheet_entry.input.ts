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
import { CreateTimeEntryInput } from 'src/time_entry/dto/create-time_entry.input';

@InputType()
export class CreateTimesheetEntryInput {
  @Field((type) => Int)
  @Type(() => Number)
  timesheet_id: number;

  @Field((type) => Int)
  @Type(() => Number)
  user_id: number;

  @Field()
  entry_date: string;

  @Field()
  tz_offset: string;

  @Field()
  tz_name: string;

  @Field((type) => [CreateTimeEntryInput])
  @Type(() => Array)
  time_entry: CreateTimeEntryInput[];

  @Field((type) => Int)
  @Type(() => Number)
  created_by_id: number;
}
