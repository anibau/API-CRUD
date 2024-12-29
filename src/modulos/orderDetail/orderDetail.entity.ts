import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products/product.entity";
import { Order } from "../orders/order.entity";

@Entity({name:'orderDetails'})
export class OrderDetail{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column({type:'decimal', precision:10, scale:2, nullable:false})
    price:number
    @OneToOne(()=>Order, (od)=>od.orderDetail)
    order:Order //1:1
    @ManyToMany(()=>Product, (item)=>item.orderDetails, {cascade:true})
    @JoinTable()
    products: Product[] //n:n
}