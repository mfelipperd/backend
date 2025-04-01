import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
import { Company, Prisma } from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private mailer: MailerService,
  ) {}

  async create(
    data: CreateCompanyDto,
  ): Promise<{ company: Company; emailStatus: 'sent' | 'failed' }> {
    const company = await this.prisma.company.create({ data });

    let emailStatus: 'sent' | 'failed' = 'sent';

    try {
      await this.sendNotificationEmail(company);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      emailStatus = 'failed';
    }

    return { company, emailStatus };
  }

  findAll(): Promise<Company[]> {
    return this.prisma.company.findMany();
  }

  findOne(id: number): Promise<Company | null> {
    return this.prisma.company.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.CompanyUpdateInput): Promise<Company> {
    return this.prisma.company.update({ where: { id }, data });
  }

  remove(id: number): Promise<Company> {
    return this.prisma.company.delete({ where: { id } });
  }

  private async sendNotificationEmail(company: Company) {
    await this.mailer.sendMail({
      from: `"Empresa Cadastro" <${this.config.get('EMAIL_USER')}>`,
      to: 'destinatarios@empresa.com.br', // Altere para o email real ou variável de ambiente
      subject: 'Nova empresa cadastrada',
      text: `Empresa "${company.name}" cadastrada com sucesso!`,
    });
  }
}
