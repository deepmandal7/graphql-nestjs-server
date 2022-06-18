import { CreateTaskBoardCustomisationInput } from './create-task_board_customisation.input';
import { PartialType } from '@nestjs/mapped-types';
import { Field, InputType, ID, Int } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsInt } from 'class-validator';

@InputType()
class TaskBoardCustomisationArray {
  @Field((type) => Int)
  @IsInt()
  id: number;
  @Field((type) => Boolean)
  @IsBoolean()
  visbility: boolean;

  @Field((type) => Boolean)
  @IsBoolean()
  mandatory: boolean;
}

export class UpdateTaskBoardCustomisationInput {
  @Field((type) => [TaskBoardCustomisationArray])
  task_board_customisation_list: TaskBoardCustomisationArray[];
}
