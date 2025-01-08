import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Category } from '../categories/category.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Product, Category])],
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
})
export class ProductsModule {}
