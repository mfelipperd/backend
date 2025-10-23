import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailController } from './emails.controller';
import { EmailTemplateService } from './templates/email-template.service';

@Module({
  controllers: [EmailController],
  providers: [EmailsService, EmailTemplateService],
})
export class EmailsModule {}
