import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const applicationPort: number = configService.get<number>('port');

  // enable cors only dev mode
  if (process.env.APP_ENV !== 'production') {
    app.enableCors({
      origin: '*',
    });
    // enable swagger only dev mode
    // const swaggerConfig = new DocumentBuilder()
    //   .setTitle('Tools Manager Backend API')
    //   .setVersion('0.0.1')
    //   .addBearerAuth(
    //     { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    //     'JWT',
    //   )
    //   .build();
    //
    // const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    // SwaggerModule.setup('docs', app, swaggerDocument, {
    //   customSiteTitle: 'Tools Manager - API Docs',
    // });
  }

  await app.listen(applicationPort).then(async () => {
    console.log(`Application is running on: ${await app.getUrl()} 🚀`);
  });
}
bootstrap();
