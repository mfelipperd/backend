/* eslint-disable @typescript-eslint/unbound-method */

import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CreateCompanyDto } from './dto/create-company.dto';
import { PrismaService } from '../prisma.service';

describe('CompanyService', () => {
  let service: CompanyService;
  let prisma: jest.Mocked<PrismaService>;
  let mailer: jest.Mocked<MailerService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: PrismaService,
          useValue: {
            company: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test@gmail.com'),
          },
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    prisma = module.get(PrismaService);
    mailer = module.get(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('Deve criar uma empresa e enviar o e-mail com sucesso', async () => {
      const dto: CreateCompanyDto = {
        name: 'Minha empresa',
        cnpj: '123146548979',
        tradeName: 'Marcos Produções',
        address: 'Rua dos bobos, 0, Nevada',
        favorite: false,
      };

      const createdCompany = {
        ...dto,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.company.create as jest.Mock).mockResolvedValue(createdCompany);

      mailer.sendMail.mockResolvedValue(undefined);

      const result = await service.create(dto);

      expect(prisma.company.create).toHaveBeenCalledWith({ data: dto });
      expect(mailer.sendMail).toHaveBeenCalled();
      expect(result).toEqual({
        company: createdCompany,
        emailStatus: 'sent',
      });
    });

    it('Deve criar a empresa mas retornar emailStatus "failed" se o envio falhar', async () => {
      const dto: CreateCompanyDto = {
        name: 'Empresa Teste',
        cnpj: '12345647899',
        tradeName: 'Fantasia teste',
        address: 'Endereço',
        favorite: false,
      };

      const createdCompany = {
        ...dto,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.company.create as jest.Mock).mockResolvedValue(createdCompany);
      mailer.sendMail.mockRejectedValue(new Error('Erro SMTP'));

      const result = await service.create(dto);

      expect(result).toEqual({
        company: createdCompany,
        emailStatus: 'failed',
      });
      expect(mailer.sendMail).toHaveBeenCalled();
    });
  });

  describe('findAll()', () => {
    it('Deve retornar uma lista de emepresas ordenadas por ID', async () => {
      const mockCompanies = [
        {
          id: 1,
          name: 'Empresa 1',
          cnpj: '123',
          tradeName: 'Fantasia 1',
          address: 'Endereço 1',
          favorite: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Empresa 2',
          cnpj: '456',
          tradeName: 'Fantasia 2',
          address: 'Endereço 2',
          favorite: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (prisma.company.findMany as jest.Mock).mockResolvedValue(mockCompanies);

      const result = await service.findAll();

      expect(prisma.company.findMany).toHaveBeenCalledWith({
        orderBy: { id: 'asc' },
      });
      expect(result).toEqual(mockCompanies);
    });
  });

  describe('remove()', () => {
    it('Deve remover uma empresa com o ID fornecido', async () => {
      const companyId = 1;

      const mockCompany = {
        id: companyId,
        name: 'Empresa a ser deletada',
        cnpj: '99999999999',
        tradeName: 'Delete LTDA',
        address: 'Rua X',
        favorite: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.company.delete as jest.Mock).mockResolvedValue(mockCompany);

      const result = await service.remove(companyId);

      expect(prisma.company.delete).toHaveBeenCalledWith({
        where: { id: companyId },
      });
      expect(result).toEqual(mockCompany);
    });
  });

  describe('update()', () => {
    it('Deve atualizar apenas os campos alterados da empresa', async () => {
      const id = 1;
      const original = {
        id,
        name: 'original',
        cnpj: '123',
        tradeName: 'Fantasia',
        address: 'Endereço',
        favorite: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updates = {
        name: 'Atualizado',
        cnpj: '123',
        tradeName: 'fantasia atualizada',
      };

      const expectedUpdates = {
        ...original,
        ...updates,
      };

      (prisma.company.findUnique as jest.Mock).mockResolvedValueOnce(original);
      (prisma.company.findUnique as jest.Mock).mockResolvedValueOnce(null);
      (prisma.company.update as jest.Mock).mockResolvedValue(updates);

      const result = await service.update(id, updates);

      expect(prisma.company.findUnique).toHaveBeenCalledWith({ where: { id } });
      expect(prisma.company.update).toHaveBeenLastCalledWith({
        where: { id },
        data: {
          name: 'Atualizado',
          tradeName: 'fantasia atualizada',
        },
      });
      expect(result).toEqual(expectedUpdates);
    });
  });
});
