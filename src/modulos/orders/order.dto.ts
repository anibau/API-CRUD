import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator"
import { Product } from "../products/product.entity"
import { Type } from "class-transformer"

export class CreateOrderDTO{
    @IsNotEmpty()
    @IsUUID()
    userId: string

    @ArrayNotEmpty()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>Product)
    products:Partial<Product>[]
}