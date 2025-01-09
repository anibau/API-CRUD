
import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { cloudinaryConfig } from 'src/configuracion/cloudinary.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/modulos/products/product.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Product])],
    providers:[FilesService, cloudinaryConfig],
    controllers:[FilesController]
})
export class FilesModule{}