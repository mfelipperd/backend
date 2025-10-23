import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { EmailsService } from './emails.service';
import { EmailRecipient } from '@prisma/client';

@ApiTags('emails')
@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailsService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar novo destinatário de e-mail' })
  @ApiBody({ type: CreateEmailDto })
  @ApiResponse({ status: 201, description: 'Destinatário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'E-mail já existe' })
  create(@Body() dto: CreateEmailDto): Promise<EmailRecipient> {
    return this.emailService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os destinatários de e-mail' })
  @ApiResponse({ status: 200, description: 'Lista de destinatários retornada com sucesso' })
  findAll() {
    return this.emailService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar destinatário de e-mail' })
  @ApiParam({ name: 'id', description: 'ID do destinatário', type: 'number' })
  @ApiBody({ type: UpdateEmailDto })
  @ApiResponse({ status: 200, description: 'Destinatário atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Destinatário não encontrado' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEmailDto) {
    return this.emailService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar destinatário de e-mail' })
  @ApiParam({ name: 'id', description: 'ID do destinatário', type: 'number' })
  @ApiResponse({ status: 200, description: 'Destinatário deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Destinatário não encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.emailService.remove(id);
  }

  @Post('test')
  @ApiOperation({ summary: 'Testar envio de e-mail' })
  @ApiResponse({ status: 200, description: 'E-mail de teste enviado com sucesso' })
  @ApiResponse({ status: 500, description: 'Erro ao enviar e-mail' })
  testEmail() {
    return this.emailService.testEmail();
  }

  @Post('test/:email')
  @ApiOperation({ summary: 'Testar envio de e-mail para e-mail específico' })
  @ApiParam({ name: 'email', description: 'E-mail para envio do teste', type: 'string' })
  @ApiResponse({ status: 200, description: 'E-mail de teste enviado com sucesso' })
  @ApiResponse({ status: 500, description: 'Erro ao enviar e-mail' })
  testEmailToSpecific(@Param('email') email: string) {
    return this.emailService.testEmailToSpecific(email);
  }
}
