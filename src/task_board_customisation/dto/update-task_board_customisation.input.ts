import { CreateTaskBoardCustomisationInput } from './create-task_board_customisation.input';
import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType, ID, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt } from 'class-validator';

export class UpdateTaskBoardCustomisationInput extends PartialType(
  CreateTaskBoardCustomisationInput,
) {
  @Field((type) => Int)
  @IsInt()
  id: number;

  @Field((type) => Boolean)
  @IsBoolean()
  task_title_mandatory: boolean;

  @Field((type) => Boolean)
  @IsBoolean()
  description_required: boolean;

  @Field((type) => Boolean)
  @IsBoolean()
  description_mandatory: boolean;

  @Field((type) => Boolean)
  @IsBoolean()
  location_required: boolean;

  @Field((type) => Boolean)
  @IsBoolean()
  location_mandatory: boolean;
}
