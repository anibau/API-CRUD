import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { OrderDetail } from "../orderDetail/orderDetail.entity";
import { Product } from "../products/product.entity";
import { CreateOrderDTO } from "./order.dto";

@Injectable()
export class OrderService{
    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
@InjectRepository(User) private userRepository: Repository<User>,
@InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>,
@InjectRepository(Product) private productRepository: Repository<Product>
){}

    async addOrder(data:CreateOrderDTO){
        if(!data.userId || !data.products){
            throw new BadRequestException('datos incompletos')
        }
        const user= await this.userRepository.findOne({where:{id:data.userId}});
        if(!user){
            throw new NotFoundException('usuario no encontrado')
        };
        //crear el orderDetail
        let totalPrice= 0;
        const products= await Promise.all(data.products.map(async(items)=>{
            const product= await this.productRepository.findOne({where:{id:items.id}});
            if(!product){
                throw new NotFoundException('producto no encontrado')
            };
            if(product.stock<=0){
                throw new NotFoundException('producto no disponible')
            }
            return product
        }));
        for(const item of products ){
            totalPrice+= Number(item.price);
            item.stock-=1;
            await this.productRepository.save(item)
        }
        const orderDetail= this.orderDetailRepository.create({products, price:totalPrice});
        await this.orderDetailRepository.save(orderDetail);

        const newDate= new Date();
        const order= this.orderRepository.create({user, orderDetail, date:newDate });
        await this.orderRepository.save(order);
        return order
    }

    async getOrder(){
        const orders= await this.orderRepository.find({relations:{orderDetail:true, user:true}});
        if(!orders){
            throw new BadRequestException('no se encontraron ordenes')
        };
        return orders
    }

    async getOrderbyId(id:string){
        const order= await this.orderRepository.findOne({where:{id:id}, relations:{orderDetail:{products:true}, user:true}});
        if(!order){
            throw new NotFoundException('orden no encontrada')
        };
        return order
    }
}