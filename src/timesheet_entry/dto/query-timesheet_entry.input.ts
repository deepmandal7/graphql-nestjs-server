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
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@InputType()
export class QueryTimesheetEntryInput {
  @Type((type) => Number)
  @Field()
  timesheetId: number;

  @Type((type) => Number)
  @Field()
  userId: number;

  @Field()
  status: TimesheetEntryStatusEnum;

  @Field()
  date1: string;

  @Field()
  date2: string;
}
