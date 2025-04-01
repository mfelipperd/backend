import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
import { Company } from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

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
    return this.prisma.company.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  findOne(id: number): Promise<Company | null> {
    return this.prisma.company.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateCompanyDto): Promise<Company> {
    const original = await this.prisma.company.findUnique({ where: { id } });
    if (!original) throw new NotFoundException('Empresa não encontrada');

    if (data.cnpj) {
      const findCnpj = await this.prisma.company.findUnique({
        where: { cnpj: data.cnpj },
      });
      if (findCnpj?.id !== original.id) {
        throw new ConflictException(
          `Cnpj ja cadastrado! front:${id}   backend:${findCnpj?.id} `,
        );
      }
    }
    const updates: Partial<UpdateCompanyDto> = {};

    for (const key in data) {
      if (data[key] !== original[key]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        updates[key] = data[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return original;
    }

    return this.prisma.company.update({
      where: { id },
      data: updates,
    });
  }

  remove(id: number): Promise<Company> {
    return this.prisma.company.delete({ where: { id } });
  }

  private async sendNotificationEmail(company: Company) {
    await this.mailer.sendMail({
      from: `"Empresa Cadastro" <${this.config.get('EMAIL_USER')}>`,
      to: 'felipperabelodurans@gmail.com',
      subject: 'Nova empresa cadastrada',
      text: `Empresa "${company.name}" cadastrada com sucesso!`,
    });
  }
}
