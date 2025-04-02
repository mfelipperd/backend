import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { PrismaService } from '../prisma.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
  ) {}

  async create(data: CreateEmailDto) {
    const emailRecord = await this.prisma.emailRecipient.create({ data });

    try {
      await this.sendConfirmationEmail(emailRecord.email);
    } catch (error) {
      console.error('Erro ao enviar e-mail de confirmação de cadastro:', error);
    }

    return emailRecord;
  }

  private async sendConfirmationEmail(email: string) {
    await this.mailer.sendMail({
      to: email,
      subject: 'Você foi adicionado para receber notificações',
      text: `Este e-mail foi configurado para receber notificações de cadastro de novas empresas na plataforma.`,
    });
  }

  async findAll() {
    return this.prisma.emailRecipient.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  async update(id: number, data: UpdateEmailDto) {
    return this.prisma.emailRecipient.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.emailRecipient.delete({
      where: { id },
    });
  }
}
