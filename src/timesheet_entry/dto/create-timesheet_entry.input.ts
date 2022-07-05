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
import { CreateEmployeeBreakInput } from 'src/employee_breaks/dto/create-employee_break.input';

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
  timezone: string;

  @Field((type) => [CreateTimeEntryInput])
  @Type(() => Array)
  time_entry: CreateTimeEntryInput[];

  @Field((type) => [CreateEmployeeBreakInput])
  @Type(() => Array)
  @IsOptional()
  employee_break: CreateEmployeeBreakInput[];

  @Field((type) => Int)
  @Type(() => Number)
  created_by_id: number;
}
