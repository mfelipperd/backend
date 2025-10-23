import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Nome da empresa',
    example: 'Empresa Exemplo Ltda',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'CNPJ da empresa (apenas números)',
    example: '12345678000195',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty({
    description: 'Nome fantasia da empresa',
    example: 'Empresa Exemplo',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  tradeName: string;

  @ApiProperty({
    description: 'Endereço da empresa',
    example: 'Rua das Flores, 123 - Centro - São Paulo/SP',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Se a empresa é favorita',
    example: true,
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  favorite: boolean;
}
