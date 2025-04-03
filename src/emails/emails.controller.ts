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
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { EmailsService } from './emails.service';
import { EmailRecipient } from '@prisma/client';

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailsService) {}

  @Post()
  create(@Body() dto: CreateEmailDto): Promise<EmailRecipient> {
    return this.emailService.create(dto);
  }

  @Get()
  findAll() {
    return this.emailService.findAll();
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEmailDto) {
    return this.emailService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.emailService.remove(id);
  }
}
