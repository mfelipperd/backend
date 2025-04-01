import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
import { Company, Prisma } from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class CompanyService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private mailer: MailerService,
  ) {}

  async create(data: Prisma.CompanyCreateInput): Promise<Company> {
    const company = await this.prisma.company.create({ data });

    await this.sendNotificationEmail(company);

    return company;
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
