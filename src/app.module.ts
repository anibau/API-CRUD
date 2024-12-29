import { Module } from '@nestjs/common';
import { UsersModule } from './modulos/users/users.module';
import { ProductsModule } from './modulos/products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './configuracion/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modulos/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeormConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UsersModule,
    ProductsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
