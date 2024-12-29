import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalMiddleware } from './middlewares/globalMiddleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(globalMiddleware)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
