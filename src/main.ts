import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express'; // <-- tambah
import { join } from 'path';                                        // <-- tambah
import 'dotenv/config';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true
    }));

    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/uploads',
    });

    const config = new DocumentBuilder()
      .setTitle('PawCare API')
      .setDescription('API documentation for PawCare')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.enableCors();

    await app.listen(process.env.PORT ?? 3000);
    console.log(`App running on port: ${process.env.PORT ?? 3000}`);
  } catch (error) {
    console.error('BOOTSTRAP ERROR:', error);
    process.exit(1);
  }
}
bootstrap();