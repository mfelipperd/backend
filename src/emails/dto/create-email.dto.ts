import { IsEmail, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmailDto {
  @ApiProperty({
    description: 'Endereço de e-mail do destinatário',
    example: 'usuario@exemplo.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Se o destinatário está ativo',
    example: true,
    type: Boolean,
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
