import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { Category } from "./category.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    providers:[CategoryService],
    controllers:[CategoryController],
    imports:[TypeOrmModule.forFeature([Category])]
})
export class CategoryModule{}