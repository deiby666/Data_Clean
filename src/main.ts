import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const PORT = process.env.PORT;

  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(PORT);
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle('Riwi Centinela')
  .setDescription(
    'API for managing authentication in Riwi training center projects',
  )
  .setVersion('1.0')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-doc', app, document);

  console.log(`App listening in port: ${PORT}`);
  console.log(`Swagger in: http://localhost:${PORT}/api-doc`);
}
bootstrap();
