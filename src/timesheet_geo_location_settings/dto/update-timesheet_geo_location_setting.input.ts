import { Field, InputType, ID, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
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
  IsObject,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

enum GeoLocationSettingsEnum {
  REQUIRED = 'REQUIRED',
  OPTIONAL = 'OPTIONAL',
  OFF = 'OFF',
}

export class UpdateTimesheetGeoLocationSettingInput {
  @Field((type) => Int)
  @Type(() => Number)
  id: number;

  @Field((type) => GeoLocationSettingsEnum)
  settings: GeoLocationSettingsEnum;

  @Field((type) => Boolean)
  @Type(() => Boolean)
  breadcrumbs_enabled: boolean;
}
