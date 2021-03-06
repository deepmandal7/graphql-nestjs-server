import { CreateTimesheetEntryInput } from './create-timesheet_entry.input';
import { PartialType } from '@nestjs/mapped-types';
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

enum TimesheetEntryStatusEnum {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class UpdateTimesheetEntryInput extends PartialType(
  CreateTimesheetEntryInput,
) {
  @Field((type) => Int)
  @IsInt()
  id: number;

  @Field((type) => TimesheetEntryStatusEnum)
  @IsEnum(TimesheetEntryStatusEnum)
  @IsOptional()
  status: TimesheetEntryStatusEnum;

  @Field()
  @IsOptional()
  entry_date: string;
}
