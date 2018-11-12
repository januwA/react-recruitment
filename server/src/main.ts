import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useStaticAssets(path.resolve(__dirname, '..', 'uploads'), {
    prefix: '/static/',
  });
  app.useStaticAssets(path.resolve(__dirname, '..', 'view', 'static'), {
    prefix: '/static/',
  });
  app.useStaticAssets('view');
  await app.listen(5000);
}
bootstrap();
