import { Field, InputType,ID  } from '@nestjs/graphql';
import { IsAlpha, IsAlphanumeric, IsDateString, IsInt, IsObject, IsString, MaxLength } from 'class-validator';

class RepeatDetails {
  repeat_type: string
  repeat_interval: number
  end_repeat_after_shifts: number
  week_days: number[]
}

@InputType()
export class CreateShiftInput {

    @IsAlphanumeric()
    @Field()
    shift_title: string
  

    @IsDateString()
    @Field()
    shift_date: Date

    @IsAlphanumeric()
    @Field()
    shift_start_time: string

    @IsAlphanumeric()
    @Field()
    shift_end_time: string

    @IsString()
    @Field()
    shift_timezone: string

    @Field((type) => ID)
    shift_job_id?: typeof ID


    @IsInt()
    @Field()
    spots_to_claim: number
  
    @Field((type) => [ID])
    @MaxLength(-1, {
        each: true,
    })
    users_id: typeof ID[]

    @Field((type) => [ID])
    @MaxLength(-1, {
        each: true,
    })
    shift_tasks_id: typeof ID[]

    @Field()
    @IsObject()
    repeat_details: RepeatDetails
}
