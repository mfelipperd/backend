import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailController } from './emails.controller';

@Module({
  controllers: [EmailController],
  providers: [EmailsService],
})
export class EmailsModule {}
