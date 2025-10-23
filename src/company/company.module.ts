import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { EmailTemplateService } from '../emails/templates/email-template.service';

@Module({
  providers: [CompanyService, EmailTemplateService],
  controllers: [CompanyController],
})
export class CompanyModule {}
