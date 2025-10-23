import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { PrismaService } from '../prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailTemplateService } from './templates/email-template.service';

@Injectable()
export class EmailsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly emailTemplate: EmailTemplateService,
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
    const htmlTemplate = this.emailTemplate.generateEmailConfirmationTemplate(email);
    
    await this.mailer.sendMail({
      to: email,
      subject: '✅ E-mail cadastrado com sucesso - Company API',
      text: `Seu e-mail foi cadastrado com sucesso no sistema. Você receberá notificações sobre novas empresas cadastradas.`,
      html: htmlTemplate,
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

  async testEmail() {
    try {
      // Buscar o primeiro destinatário ativo para enviar o teste
      const recipient = await this.prisma.emailRecipient.findFirst({
        where: { active: true },
      });

      if (!recipient) {
        throw new Error('Nenhum destinatário ativo encontrado');
      }

      const htmlTemplate = this.emailTemplate.generateEmailConfirmationTemplate(recipient.email);

      await this.mailer.sendMail({
        to: recipient.email,
        subject: '🧪 Teste de E-mail - Company API',
        text: 'Este é um e-mail de teste para verificar se a configuração está funcionando.',
        html: htmlTemplate,
      });
      return { message: `E-mail de teste enviado com sucesso para ${recipient.email}!` };
    } catch (error) {
      console.error('Erro ao enviar e-mail de teste:', error);
      throw new Error(`Erro ao enviar e-mail: ${error.message}`);
    }
  }

  async testEmailToSpecific(email: string) {
    try {
      const htmlTemplate = this.emailTemplate.generateEmailConfirmationTemplate(email);

      await this.mailer.sendMail({
        to: email,
        subject: '🧪 Teste de E-mail - Company API',
        text: 'Este é um e-mail de teste para verificar se a configuração está funcionando.',
        html: htmlTemplate,
      });
      return { message: `E-mail de teste enviado com sucesso para ${email}!` };
    } catch (error) {
      console.error('Erro ao enviar e-mail de teste:', error);
      throw new Error(`Erro ao enviar e-mail: ${error.message}`);
    }
  }
}
