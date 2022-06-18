import { CreateTaskBoardInput } from './create-task_board.input';
import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType, ID, Int } from '@nestjs/graphql';
import {
  IsAlpha,
  IsAlphanumeric,
  IsDateString,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

@InputType()
export class UpdateTaskBoardInput extends PartialType(CreateTaskBoardInput) {
  id: number;
}
