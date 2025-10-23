import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    cors: '*',
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Company Management API')
    .setDescription('API para gerenciamento de empresas e destinatários de e-mail')
    .setVersion('1.0')
    .addTag('companies', 'Operações relacionadas a empresas')
    .addTag('emails', 'Operações relacionadas a destinatários de e-mail')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
