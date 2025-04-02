/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './emails.controller';
import { EmailsService } from './emails.service';
import { EmailRecipient } from '@prisma/client';
import { CreateEmailDto } from './dto/create-email.dto';

describe('EmailController', () => {
  let controller: EmailController;
  let service: jest.Mocked<EmailsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [
        {
          provide: EmailsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EmailController>(EmailController);
    service = module.get(EmailsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('Deve criar um novo email', async () => {
      const dto: CreateEmailDto = { email: 'teste@email.com' };

      const mockEmail: EmailRecipient = {
        id: 1,
        email: dto.email,
        createdAt: new Date(),
        active: true,
        updatedAt: new Date(),
      };

      service.create.mockResolvedValue(mockEmail);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockEmail);
    });
  });

  describe('findAll()', () => {
    it('deve retornar a lista de e-mails cadastrados', async () => {
      const mockEmails: EmailRecipient[] = [
        {
          id: 1,
          email: 'a@email.com',
          createdAt: new Date(),
          active: false,
          updatedAt: new Date(),
        },
        {
          id: 2,
          email: 'b@email.com',
          createdAt: new Date(),
          active: false,
          updatedAt: new Date(),
        },
      ];

      service.findAll.mockResolvedValue(mockEmails);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockEmails);
    });
  });

  describe('update()', () => {
    it('deve atualizar um e-mail', async () => {
      const updated = {
        id: 1,
        email: 'novo@email.com',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      service.update.mockResolvedValue(updated);

      const result = await controller.update(1, { email: updated.email });

      expect(service.update).toHaveBeenCalledWith(1, { email: updated.email });
      expect(result).toEqual(updated);
    });
  });

  describe('remove()', () => {
    it('deve remover um e-mail', async () => {
      const mockEmail = {
        id: 1,
        email: 'x@email.com',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      service.remove.mockResolvedValue(mockEmail);

      const result = await controller.remove(1);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockEmail);
    });
  });
});
