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
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTimesheetNotificationSettingInput {
  @Field()
  @Type(() => Number)
  id: number;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_request_absence_mobile: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_request_absence_webpush: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_request_absence_email: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_new_shift_added_mobile: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_new_shift_added_webpush: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_new_shift_added_email: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_edit_shift_mobile: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_edit_shift_webpush: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_edit_shift_email: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_exceeds_mobile: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_exceeds_webpush: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_exceeds_email: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_auto_clock_out_mobile: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_auto_clock_out_webpush: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_auto_clock_out_email: boolean;

  @Field((type) => Number)
  @Type(() => Number)
  user_pending: number;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_pending_mobile: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_pending_webpush: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  user_pending_email: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  admin_absence_approval_mobile: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  admin_absence_approval_webpush: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  admin_absence_approval_email: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  admin_shift_approval_mobile: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  admin_shift_approval_webpush: boolean;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  admin_shift_approval_email: boolean;
}
