import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsInt } from 'class-validator';
@InputType()
export class CreatePetInput {
  @IsAlpha()
  @Field()
  name: string;

  @Field()
  @IsInt()
  ownerId: number;
}
