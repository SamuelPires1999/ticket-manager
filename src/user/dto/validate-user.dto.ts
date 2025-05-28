import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ValidateUserDto {
  @IsEmail()
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email needs to be provided' })
  email: string;
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password needs to be provided' })
  password: string;
}
