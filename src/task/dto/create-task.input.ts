import { Field, InputType, ID, Int  } from '@nestjs/graphql';
import { IsAlpha, IsAlphanumeric, IsArray, IsDateString, IsEnum, IsInt, IsLatLong, IsObject, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

enum TaskFrequencyEnum{
    ONEOFF = 'ONEOFF',
    RECURRING = 'RECURRING'
}

@InputType()
export class CreateTaskInput {
    @Field()
    @Length(4, 20)
    task_title: string

    @Field()
    @Length(4, 50)
    task_description: string

    @Field((type) => [String])
    task_file_id: string[]
    
    @IsEnum(TaskFrequencyEnum)
    @Field((type) => TaskFrequencyEnum)
    task_frequency: TaskFrequencyEnum

    @IsDateString()
    @Field((type) => Date)
    task_start_utc_date_time: Date

    @IsDateString()
    @Field((type) => Date)
    task_end_utc_date_time: Date


    @Field()
    @IsLatLong()
    task_coordinates: string

    @Field()
    task_location: string

    @Field((type) => Int)
    task_board_id: number

    @Field((type) => Int)
    @IsInt()
    created_by: number
}
