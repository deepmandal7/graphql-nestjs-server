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

export class CreateWorkDurationInput {
  @Field((type) => Int)
  @IsInt()
  user_id: number;

  @Field((type) => Int)
  @IsInt()
  time_entry_id: number;

  @Field((type) => Date)
  @IsDateString()
  check_in_time: Date;

  @Field((type) => Date)
  @IsDateString()
  check_out_time: Date;
}
