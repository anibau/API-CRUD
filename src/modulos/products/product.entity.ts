import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../categories/category.entity";
import { OrderDetail } from "../orderDetail/orderDetail.entity";

@Entity({name: 'products'})
export class Product{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column({type:"varchar", nullable:false, length:50})
    name:string
    @Column({type:"varchar", nullable: false})
    description: string
    @Column({type:'decimal', precision:10, scale:2, nullable:false})
    price: number
    @Column({type:'int', nullable:false})
    stock: number
    @Column({type:"varchar", default:'https://cdn-icons-png.flaticon.com/512/5115/5115607.png', })
    imgUrl: string
    @ManyToOne(()=>Category, (cat)=>cat.products, {nullable:false})
    category:Category //1:n
    @ManyToMany(()=>OrderDetail, (od)=>od.products)
    orderDetails: OrderDetail[] //n:n
}