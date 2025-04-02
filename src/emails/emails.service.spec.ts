/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { EmailsService } from './emails.service';
import { PrismaService } from '../prisma.service';
import { CreateEmailDto } from './dto/create-email.dto';

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
});
