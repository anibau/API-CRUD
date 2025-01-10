import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDTO } from "./product.dto";
import { AuthGuard } from "../auth/auth.guard";
import { RoleGuard } from "../auth/role.guard";
import { Role, Roles } from "../auth/role.decorator";

@Controller('products')
export class ProductController{
    constructor(private readonly productService:ProductService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(@Query('page') page:number=1, @Query('limit') limit:number=5){
        try{
            return this.productService.getAll(page, limit)
        }catch(err){
            throw new BadRequestException('error al obtener productos '+err)
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id', ParseUUIDPipe) id:string){
        try{
            return this.productService.getByID(id)
        }catch(err){
            throw new BadRequestException('error al obtener producto '+err)
        }
    }

    @Post()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async createProduct(@Body() data:ProductDTO){
        try{
            return this.productService.createProduct(data)
        }catch(err){
            throw new BadRequestException('error al crear producto '+err)
        }
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    async updateProduct(@Param('id', ParseUUIDPipe) id:string, @Body() data: ProductDTO){
        try{
            return this.productService.updateProduct(data, id)
        }catch(err){
            throw new BadRequestException('error al actualizar producto '+err)
        }
    }
    @Delete(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    async deleteProduct(@Param('id', ParseUUIDPipe) id:string){
        try{
            return this.productService.deleteProduct(id)
        }catch(err){
            throw new BadRequestException('error al eliminar producto '+err)
        }
    }
}