import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Product])],
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
})
export class ProductsModule {}
