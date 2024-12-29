import { Order } from "src/modulos/orders/order.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column({nullable:false, type:"varchar", length:50})
    name: string
    @Column({type:"varchar", unique:true, length:50, nullable:false})
    email:string
    @Column({type:"varchar", nullable:false, length:20})
    password:string
    @Column('int') //{type:'int'}
    phone: number
    @Column({type:"varchar", length:50})
    country:string
    @Column({type:"varchar"})
    address: string
    @Column({type:"varchar", length:50})
    city: string
    @OneToMany(()=>Order, (order)=>order.user, {cascade:true}) //1:n
    orders: Order[]
    @Column({default: false})
    isAdmin: boolean
}
