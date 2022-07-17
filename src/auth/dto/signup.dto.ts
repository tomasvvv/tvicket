import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
