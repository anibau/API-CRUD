import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products/product.entity";

@Entity({name:'categories'})
export class Category{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column({type:"varchar", length:50, nullable: false})
    name: string
    @OneToMany(()=>Product, (item)=>item.category, {cascade:true})
    products: Product[] //n:1
}