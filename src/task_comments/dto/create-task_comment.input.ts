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
export class CreateTaskCommentInput {
  @IsInt()
  @Field((type) => Int)
  user_id: number;

  @IsString()
  @Field()
  comment: string;

  @IsInt()
  @Field((type) => Int)
  task_id: number;
}
