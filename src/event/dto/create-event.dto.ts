import {
  IsISO8601,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MinLength(10)
  title: string;
  @IsString()
  @MinLength(20)
  description: string;
  @IsISO8601()
  date: Date;
  @IsString()
  @MinLength(5)
  location: string;
  @IsNumber()
  @IsPositive()
  maxattendees: number;
}
