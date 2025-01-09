import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadApiResponse, v2 } from 'cloudinary';
import { Product } from 'src/modulos/products/product.entity';
import { Repository } from 'typeorm';
import * as toStream from 'buffer-to-stream'

@Injectable()
export class FilesService {
    constructor(@InjectRepository(Product) private productRepository:Repository<Product>){}

    async uploadImage(data:Express.Multer.File , id: string) {
        const product= await this.productRepository.findOne({where:{id:id}});
        if(!product){
            throw new NotFoundException('producto no encontrado');
        };
        const result: UploadApiResponse= await new Promise((resolve, reject)=>{
            const fileUpload= v2.uploader.upload_stream(
                {resource_type: 'auto'},
                (error, result)=>{
                    if(error){
                        reject(error)
                    } else{resolve(result as UploadApiResponse)}
                }                
            ); toStream(data.buffer).pipe(fileUpload)
        });
        if(!result){
            throw new BadRequestException('error al cargar la imagen')
        }
     product.imgUrl= result.url;
     await this.productRepository.save(product);
     return {message: 'imagen actualizada exitosamente', product}
    }
}
