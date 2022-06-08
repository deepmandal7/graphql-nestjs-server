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

export class QueryTaskInput {
  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  taskBoardId: number;

  @IsBoolean()
  @Field()
  @IsOptional()
  isUnassigned: boolean;

  @IsArray()
  @Field((type) => [Int])
  @IsOptional()
  userIds: number[];

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  userId;

  @Field()
  @IsString()
  @IsOptional()
  startDate: string;

  @Field()
  @IsString()
  @IsOptional()
  dates: string;

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  fromStartYear: number;

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  fromStartMonth: number;

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  fromStartDate: number;

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  toStartYear: number;

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  toStartMonth: number;

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  toStartDate: number;

  @IsArray()
  @Field((type) => [Int])
  @IsOptional()
  tagIds: number[];

  @Field((type) => Int)
  @IsInt()
  @IsOptional()
  createdBy: number;

  @IsArray()
  @Field((type) => [String])
  @IsOptional()
  taskStatus: string[];
}
