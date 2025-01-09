import { Module } from '@nestjs/common';
import { UsersModule } from './modulos/users/users.module';
import { ProductsModule } from './modulos/products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './configuracion/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modulos/auth/auth.module';
import { CategoryModule } from './modulos/categories/category.module';
import { OrderDetailsModule } from './modulos/orderDetail/orderDetails.module';
import { OrderModule } from './modulos/orders/order.module';
import { FilesModule } from './modulos/files/files.module';
import { JwtModule } from '@nestjs/jwt';

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
    AuthModule,
    CategoryModule,
    OrderDetailsModule,
    OrderModule,
    FilesModule,
    JwtModule.register({
      global:true,
      signOptions:{expiresIn:'2h'},
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
