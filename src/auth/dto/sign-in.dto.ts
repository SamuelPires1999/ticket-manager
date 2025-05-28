import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty({ message: 'Email needs to be provided' })
  email: string;
  @IsString()
  @IsNotEmpty({ message: 'Password needs to be provided' })
  password: string;
}
