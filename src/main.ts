import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const PORT = process.env.PORT;

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Data clean')
    .setDescription(
      'The Data Clean - Van Rossum project is designed to address the needs of organizations requiring efficient and reliable management of information. Our API facilitates the preparation and sanitization of files to ensure data integrity and usability. The core functionalities of this API are geared towards handling plain text files and providing users with robust tools to manage data before exporting it in various formats such as txt file',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(PORT);
  console.log(`App listening in port: ${PORT}`);
  console.log(`Swagger in: http://localhost:${PORT}/api-doc`);
}
bootstrap();
