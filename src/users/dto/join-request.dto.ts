import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class JoinRequestDto {
  @IsEmail()
  public email: string;

  @IsString()
  public nickname: string;

  @IsString()
  public password: string;
}
