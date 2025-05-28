import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsString()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
  @IsString()
  name: string;
  @IsString()
  @MaxLength(11)
  document: string;
}
