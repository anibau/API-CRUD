import { Module } from "@nestjs/common";
import { OrderDetailService } from "./orderDetail.service";
import { OrderDetailsController } from "./orderDetail.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Product } from "../products/product.entity";
import { Order } from "../orders/order.entity";
import { OrderDetail } from "./orderDetail.entity";

@Module({providers:[OrderDetailService],
    controllers:[OrderDetailsController],
    imports:[TypeOrmModule.forFeature([User, Product, Order, OrderDetail])]
})
export class OrderDetailsModule{}
