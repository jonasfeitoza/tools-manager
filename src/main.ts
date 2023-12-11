import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from './common/config/config.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // enable shutdown hook
  app.enableShutdownHooks();

  const configService: ConfigService = app.get(ConfigService);
  const appConfig = configService.get<NestConfig>('application');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  if (swaggerConfig.enabled) {
    const swaggerOptions = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'JWT',
      )
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup(swaggerConfig.path, app, swaggerDocument);
  }

  if (corsConfig.enabled) {
    app.enableCors();
  }

  await app
    .listen(process.env.PORT || appConfig.port || 3000)
    .then(async () => {
      console.log(`Application is running on: ${await app.getUrl()} 🚀`);
    });
}

bootstrap();
