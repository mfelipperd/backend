import { ConflictException, Injectable } from '@nestjs/common';
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
    const normalizedEmail = data.email.trim().toLowerCase();

    const existing = await this.prisma.emailRecipient.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      throw new ConflictException('Este e-mail já está cadastrado.');
    }

    try {
      const emailRecord = await this.prisma.emailRecipient.create({
        data: {
          ...data,
          email: normalizedEmail,
        },
      });

      try {
        await this.sendConfirmationEmail(emailRecord.email);
      } catch (error) {
        console.error(
          'Erro ao enviar e-mail de confirmação de cadastro:',
          error,
        );
      }

      return emailRecord;
    } catch (error) {
      if ((error as { code?: string }).code === 'P2002') {
        throw new ConflictException('Este e-mail já existe no sistema.');
      }

      throw error;
    }
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
