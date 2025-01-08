import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { Order } from "./order.entity";
import { User } from "../users/entities/user.entity";
import { OrderDetail } from "../orderDetail/orderDetail.entity";
import { Product } from "../products/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    providers:[OrderService],
    controllers:[OrderController],
    imports:[TypeOrmModule.forFeature([Order, User, OrderDetail, Product])]
})
export class OrderModule {}