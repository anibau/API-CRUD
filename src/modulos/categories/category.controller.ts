import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller('categories')
export class CategoryController{
    constructor(private readonly categoryService:CategoryService){}
    
    @Get()
    async getCategories(){
        return this.categoryService.getCategories()
    }

    @Post()
    async addCategories(@Body() data){
        return this.categoryService.addCategories(data)
    }
}