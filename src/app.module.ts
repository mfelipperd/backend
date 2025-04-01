import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { CompanyModule } from './company/company.module';
import { PrimasModule } from './prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CompanyModule,
    PrimasModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
