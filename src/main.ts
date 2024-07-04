import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //   const app = await NestFactory.create(AppModule,{ cors: true });
  const configService = app.get(ConfigService);
  const port = configService.get<string>('APP_PORT');
  const appHost = configService.get<string>('APP_HOST');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  if (configService.get<string>('ENVIRONMENT') === 'development') {
    app.enableCors({
      // allowedHeaders: ['origin', 'x-requested-with', 'content-type', 'accept', 'authorization'],
      // credentials: true,
      origin: ['http://localhost:3001', 'http://localhost:3000'],
    });
  }

  const apiDocsPath = 'api-docs';
  SwaggerModule.setup(
    apiDocsPath,
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(`ToDo api`)
        .setDescription(`The ToDo API docs`)
        .setVersion('1.0')
        .addTag('ToDo')
        .addBearerAuth()
        .build(),
    ),
  );

  await app.listen(port);
  Logger.log(`🚀 ToDo-Backend is running on: http://${appHost}:${port}`);
  Logger.log(
    `🚀 Api-Docs is acceptable on: http://${appHost}:${port}/${apiDocsPath}`,
  );
}

bootstrap();
