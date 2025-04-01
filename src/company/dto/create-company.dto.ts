import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  tradeName: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsBoolean()
  favorite: boolean;
}
