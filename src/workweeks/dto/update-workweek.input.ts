import { PartialType } from '@nestjs/mapped-types';
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
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateWorkweekInput {
  @Field()
  @Type(() => Number)
  id: number;

  @Field((type) => Boolean)
  @IsBoolean()
  monday: boolean;

  @Field()
  monday_start_time: string;

  @Field()
  monday_end_time: string;

  @Field((type) => Boolean)
  @IsBoolean()
  tuesday: boolean;

  @Field()
  tuesday_start_time: string;

  @Field()
  tuesday_end_time: string;

  @Field((type) => Boolean)
  @IsBoolean()
  wednesday: boolean;

  @Field()
  wednesday_start_time: string;

  @Field()
  wednesday_end_time: string;

  @Field((type) => Boolean)
  @IsBoolean()
  thursday: boolean;

  @Field()
  thursday_start_time: string;

  @Field()
  thursday_end_time: string;

  @Field((type) => Boolean)
  @IsBoolean()
  friday: boolean;

  @Field()
  friday_start_time: string;

  @Field()
  friday_end_time: string;

  @Field((type) => Boolean)
  @IsBoolean()
  saturday: boolean;

  @Field()
  saturday_start_time: string;

  @Field()
  saturday_end_time: string;

  @Field((type) => Boolean)
  @IsBoolean()
  sunday: boolean;

  @Field()
  sunday_start_time: string;

  @Field()
  sunday_end_time: string;
}
