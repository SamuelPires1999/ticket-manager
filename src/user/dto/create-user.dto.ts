import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email needs to be provided' })
  email: string;
  @IsNotEmpty({ message: 'Password needs to be provided' })
  @IsString({ message: 'Password must be a string' })
  password: string;
  @IsNotEmpty({ message: 'Name needs to be provided' })
  @IsString({ message: 'Name must be a string' })
  name: string;
}
