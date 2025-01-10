import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalMiddleware } from './middlewares/globalMiddleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AuthRepository } from './modulos/auth/auth.repository';

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

  const createAdmin= app.get(AuthRepository);
  await createAdmin.createUserAdmin()

  app.use(globalMiddleware)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
