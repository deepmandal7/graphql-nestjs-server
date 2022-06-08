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
  taskBoardId: number;

  @IsBoolean()
  @Field()
  isUnassigned: boolean;

  @IsArray()
  @Field((type) => [Int])
  userIds: number[];

  @Field((type) => Int)
  @IsInt()
  userId;

  @Field()
  @IsString()
  dates: string;

  @Field((type) => Int)
  @IsInt()
  fromStartYear: number;

  @Field((type) => Int)
  @IsInt()
  fromStartMonth: number;

  @Field((type) => Int)
  @IsInt()
  fromStartDate: number;

  @Field((type) => Int)
  @IsInt()
  toStartYear: number;

  @Field((type) => Int)
  @IsInt()
  toStartMonth: number;

  @Field((type) => Int)
  @IsInt()
  toStartDate: number;

  @IsArray()
  @Field((type) => [Int])
  tagIds: number[];

  @Field((type) => Int)
  @IsInt()
  createdBy: number;

  @IsArray()
  @Field((type) => [String])
  taskStatus: string[];
}
