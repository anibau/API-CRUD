import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalMiddleware } from './middlewares/globalMiddleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    exceptionFactory(errors) {
        const error= errors.map((err)=> {return {
          property: err.property, constraints: err.constraints
        }});
        return new BadRequestException({alert:'se detectaron los sgtes errores:', errors: error})
    },
  }))

  app.use(globalMiddleware)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
