import { IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateEmailDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
