import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/static/',
  });
  await app.listen(5000);
}
bootstrap();
