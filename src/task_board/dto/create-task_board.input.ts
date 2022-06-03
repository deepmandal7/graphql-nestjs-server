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

enum CanCreateEnum {
  EVERYONE = 'EVERYONE',
  ADMIN = 'ADMIN',
}

type CustomisationOptions = {
  mandatory: boolean;
  checked: boolean;
};

class Tag {
  tag_name: string;
  tag_type: string;
}

@InputType()
export class CreateTaskBoardInput {
  @Field((type) => Int)
  org_id: number;
  @Field()
  @Length(4, 20)
  task_board_name: string;

  @IsInt()
  @Field((type) => Int)
  created_by: number;

  // @Field((type) => [ID])
  // team_user_ids: number

  // @Field((type) => [ID])
  // admin_ids: typeof ID[]

  @IsEnum(CanCreateEnum)
  @Field((type) => CanCreateEnum)
  can_create: CanCreateEnum;
}
