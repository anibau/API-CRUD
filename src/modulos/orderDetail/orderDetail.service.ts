import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderDetail } from "./orderDetail.entity";
import { Order } from "../orders/order.entity";
import { Product } from "../products/product.entity";

@Injectable()
export class OrderDetailService {
    constructor(@InjectRepository(OrderDetail) private orderDetailRepository:Repository<OrderDetail>,
@InjectRepository(Order) private orderRepository:Repository<Order>,
@InjectRepository(Product) private productRepository:Repository<Product>
){}

    async getOrderDetail(){
        const ordersDetail= await this.orderDetailRepository.find({relations:{products:true}});
        if(!ordersDetail){
            throw new NotFoundException('no se encontraron dealles de ordenes')
        }
        return ordersDetail
    }
    async getOrderDetailbyId(id:string){
        const orderbyId= await this.orderDetailRepository.findOne({where:{id:id}});
        if(!orderbyId){
            throw new NotFoundException('no se encontro el orderDetail por id')
        };
        return orderbyId
    }
    async addOrderDetail(data):Promise<OrderDetail>{
        if(!data.order || !data.products){
            throw new BadRequestException('datos incompletos')
        };
        const order= await this.orderRepository.findOne({where:{id:data.order as unknown as string}});
        if(!order){
            throw new NotFoundException('no se encontro la orden relacionada')
        }
        let TotalPrice=0;
        const productos= await Promise.all(data.products.map(async(item)=>{
            const product= await this.productRepository.findOne({where:{id:item.id}});
            if(!product){
                throw new NotFoundException('no se encontro el producto '+item.id)
            }
            if(product.stock<=0){
                throw new BadRequestException('producto sin stock')
            };
            return product
        }));
        for(const item of productos){
            TotalPrice+= parseFloat(item.price);
            item.stock-=1;
            await this.productRepository.save(item)
        }

        const newOrderDetail= this.orderDetailRepository.create({order, price:TotalPrice, products:productos});
        await this.orderDetailRepository.save(newOrderDetail)
        return newOrderDetail
    }
}