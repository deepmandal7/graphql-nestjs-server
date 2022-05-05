import { Field, InputType, ID, Int  } from '@nestjs/graphql';
import { ArrayMaxSize, ArrayMinSize, IsAlpha, IsAlphanumeric, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsLatLong, IsObject, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

enum TaskFrequencyEnum{
    ONEOFF = 'ONEOFF',
    RECURRING = 'RECURRING'
}

enum RepeatTypeEnum {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY'
  }

export class RepeatDetails {
    @IsInt()
    task_id?: number

    @IsDateString()
    stop_repeat?: Date

    @IsInt()
    how_often_repeat: number

    @IsAlpha()
    repeat_type: RepeatTypeEnum

    @ArrayMinSize(1)
    @ArrayMaxSize(7)
    day_of_week?: number[]

    @IsInt()
    day_of_month?: number

    @IsInt()
    week_of_month?: number

    @IsInt()
    month_of_year?: number
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

    @IsAlpha()
    @Field()
    task_status: string;

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


    @Field((type) => RepeatDetails)
    @IsOptional()
    repeat_details?: RepeatDetails
}
