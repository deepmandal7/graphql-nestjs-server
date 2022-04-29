import { Field, InputType,ID, Int  } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsAlpha, IsAlphanumeric, IsInt, IsNotEmpty, Length, MaxLength } from 'class-validator';

@InputType()
export class CreateJobInput {
    @Field()
    @Length(4, 20)
    job_title: string

    @Field((type) => [Int])
    qualified_users_id?: number[]

    @Field((type) => [Int])
    qualified_groups_id: number[]

    @Field((type) => [Int])
    subjobs_id?: number[]
}
