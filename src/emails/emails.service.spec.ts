/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { EmailsService } from './emails.service';
import { PrismaService } from '../prisma.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { MailerService } from '@nestjs-modules/mailer';

describe('EmailService', () => {
  let service: EmailsService;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailsService,
        {
          provide: PrismaService,
          useValue: {
            emailRecipient: {
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
      ],
    }).compile();

    service = module.get<EmailsService>(EmailsService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('deve cadastrar um novo e-mail com sucesso', async () => {
      const dto: CreateEmailDto = {
        email: 'teste@email.com',
        active: true,
      };

      const mockEmail = {
        ...dto,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.emailRecipient.create as jest.Mock).mockResolvedValue(mockEmail);

      const result = await service.create(dto);

      expect(prisma.emailRecipient.create).toHaveBeenCalledWith({ data: dto });
      expect(result).toEqual(mockEmail);
    });
  });

  describe('findAll()', () => {
    it('deve retornar uma lista de e-mails', async () => {
      const mockEmails = [
        {
          id: 1,
          email: 'teste1@email.com',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          email: 'teste2@email.com',
          active: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (prisma.emailRecipient.findMany as jest.Mock).mockResolvedValue(
        mockEmails,
      );

      const result = await service.findAll();

      expect(prisma.emailRecipient.findMany).toHaveBeenCalledWith({
        orderBy: { id: 'asc' },
      });
      expect(result).toEqual(mockEmails);
    });
  });
  describe('update()', () => {
    it('deve atualizar os dados de um e-mail', async () => {
      const id = 1;
      const updateData = {
        email: 'novo@email.com',
        active: true,
      };

      const updatedEmail = {
        id,
        ...updateData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.emailRecipient.update as jest.Mock).mockResolvedValue(
        updatedEmail,
      );

      const result = await service.update(id, updateData);

      expect(prisma.emailRecipient.update).toHaveBeenCalledWith({
        where: { id },
        data: updateData,
      });

      expect(result).toEqual(updatedEmail);
    });
  });

  describe('remove()', () => {
    it('deve remover um e-mail com sucesso', async () => {
      const id = 1;

      const deletedEmail = {
        id,
        email: 'remover@email.com',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.emailRecipient.delete as jest.Mock).mockResolvedValue(
        deletedEmail,
      );

      const result = await service.remove(id);

      expect(prisma.emailRecipient.delete).toHaveBeenCalledWith({
        where: { id },
      });

      expect(result).toEqual(deletedEmail);
    });
  });
});
