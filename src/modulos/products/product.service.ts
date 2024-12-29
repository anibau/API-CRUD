import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { ProductDTO } from "./product.dto";

@Injectable()
export class ProductService{
    constructor(private readonly productRepository: ProductRepository){}

    getAll(page:number, limit:number){
        return this.productRepository.getAll(page, limit)
    }
    getByID(id:string){
        return this.productRepository.getOnebyId(id)
    }
    createProduct(data:ProductDTO){
        return this.productRepository.createProduct(data)
    }
    updateProduct(data:ProductDTO, id:string){
        return this.productRepository.updateProduct(data, id)
    }
    deleteProduct(id:string){
        return this.productRepository.deleteProduct(id)
    }
}