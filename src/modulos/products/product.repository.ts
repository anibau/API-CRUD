import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductDTO } from "./product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductRepository{
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>){}

    async getAll(page: number, limit:number):Promise<Product[]>{
        const initialPage= (page-1)*limit;
        const lastPage= initialPage+limit;

        const products= await this.productRepository.find();
        if(!products){
            throw new NotFoundException('productos no encontrados')
        }
        return products.slice(initialPage, lastPage)
    }
    async getOnebyId(id:string):Promise<Product>{
        // const product= products.find((item)=>item.id=== id);
        const product= await this.productRepository.findOne({where:{id:id}});
        if(!product){
            throw new NotFoundException('producto no encontrado')
        }
        return product
    }
    async createProduct(data:ProductDTO): Promise<Product>{
        // const productId= products.length+1;
        // const idToString= productId.toString();
        // const newProduct= {
        //     id: idToString,
        //     name: data.name,
        //     description: data.description,
        //     stock: data.stock,
        //     price: data.price
        // }; products.push(newProduct);
        const newProduct= this.productRepository.create(data);
        if(!newProduct){
            throw new NotFoundException('producto no creado')
        };
        await this.productRepository.save(newProduct);
        return newProduct
    }
    async updateProduct(data:ProductDTO, id:string){
        // const product= products.find((item)=>item.id===id);
        // product.name=data.name;
        // product.description=data.description;
        // product.stock=data.stock;
        // product.price=data.price;
        const product= await this.productRepository.findOne({where:{id:id}});
        if(!product){
            throw new NotFoundException('producto no encontrado')
        };
        Object.assign(product, data);
        await this.productRepository.save(product);
        return product
    }
    async deleteProduct(id:string){
        // const product= products.filter((item)=>item.id!==id);
        const product= await this.productRepository.findOne({where:{id:id}});
        if(!product){
            throw new NotFoundException('producto no encontrado')
        };
        await this.productRepository.remove(product);
        return 'producto eliminado exitosamente'
    }
}