import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProductDTO } from "./product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { Category } from "../categories/category.entity";

@Injectable()
export class ProductRepository{
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>,
@InjectRepository(Category) private categoryRepository: Repository<Category>){}

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
        const product= await this.productRepository.findOne({where:{id:id}, relations:{category:true}});
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
        const nameProduct= await this.productRepository.findOne({where:{name: data.name}});
        if(nameProduct){
            throw new BadRequestException('producto ya existente')
        };
        const {category, ...rest}=data;
        if(!category){
            throw new BadRequestException('debe indicar una categoria del producto')
        }
        let categori= await this.categoryRepository.findOne({where:{name: category}});
        if(!categori){
            categori= this.categoryRepository.create({name:category});
            await this.categoryRepository.save(categori)
        };
       
        const newProduct= this.productRepository.create({category:categori, ...rest});
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

        const{category, ...rest}=data;
        let categori= await this.categoryRepository.findOne({where:{name:category}});
        if(!categori){
            categori= this.categoryRepository.create({name:category});
            await this.categoryRepository.save(categori)
        };
        product.category= categori;
        Object.assign(product, rest);
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