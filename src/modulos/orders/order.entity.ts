import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/entities/user.entity";
import { OrderDetail } from "../orderDetail/orderDetail.entity";

@Entity({name:'orders'})
export class Order{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @ManyToOne(()=>User, (user)=>user.orders)
    user:User //1:n
    @Column('date')
    date:Date
    @OneToOne(()=>OrderDetail, (od)=>od.order, {cascade:true})
    @JoinColumn()
    orderDetail: OrderDetail //1:1
}