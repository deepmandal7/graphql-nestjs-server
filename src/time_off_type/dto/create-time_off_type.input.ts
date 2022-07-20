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

enum TimeOffTypeUnitsEnum {
  DAYS = 'DAYS',
}

export class CreateTimeOffTypeInput {
  @Field((type) => Int)
  @IsInt()
  org_id: number;

  @Field()
  name: string;

  @Field((type) => TimeOffTypeUnitsEnum)
  @IsEnum(TimeOffTypeUnitsEnum)
  @IsOptional()
  unit: TimeOffTypeUnitsEnum;

  @Field((type) => Boolean)
  @IsBoolean()
  @IsOptional()
  paid: boolean;

  @Field((type) => Boolean)
  @IsBoolean()
  @IsOptional()
  is_enabled: boolean;

  @Field((type) => Boolean)
  @IsBoolean()
  @IsOptional()
  all_user: boolean;

  @Field((type) => [Int])
  @IsOptional()
  @IsArray()
  user: number[];
}
