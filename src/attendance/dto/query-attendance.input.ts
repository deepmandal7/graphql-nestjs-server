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

export class QueryAttendanceInput {
  @Field((type) => Int)
  @IsOptional()
  user_id: number;

  @Field()
  @IsOptional()
  from_date: string;

  @Field()
  @IsOptional()
  to_date: string;
}
