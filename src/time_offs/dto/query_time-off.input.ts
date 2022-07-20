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

enum TimeOffStatusEnum {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
}

export class QueryTimeOffInput {
  @IsInt()
  @IsOptional()
  user_id: number;

  @IsEnum(TimeOffStatusEnum)
  @IsOptional()
  status: TimeOffStatusEnum;

  @IsInt()
  @IsOptional()
  timesheet_id: number;
}
