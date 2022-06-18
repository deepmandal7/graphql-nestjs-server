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

@InputType()
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
  startDate: Date;

  @Field()
  @IsOptional()
  endDate: string;

  @Field((type) => Date)
  @IsDateString()
  @IsOptional()
  filter_date_time: Date;

  @IsDateString()
  @IsOptional()
  next_date_time: Date;

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
