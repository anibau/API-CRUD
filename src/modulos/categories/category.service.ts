import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService{
    constructor (@InjectRepository(Category) private categoryRepository:Repository<Category>){}

    async getCategories(){
        const categories= await this.categoryRepository.find({relations:{products:true}});
        if(!categories){
            throw new BadRequestException('no se encontraron categorias')
        };
        return categories
    }

    async addCategories(data){
        if(!data.name ){
            throw new BadRequestException('datos incompletos')
        }
        const foundCategory= await this.categoryRepository.findOne({where:{name:data.name}});
        if(foundCategory){
            throw new BadRequestException('la categoria ya existe')
        }
        const newCategory= this.categoryRepository.create({name:data.name});
        await  this.categoryRepository.save(newCategory);
        return newCategory
    }
}