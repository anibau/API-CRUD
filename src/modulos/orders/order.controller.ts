import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller('orders')
export class OrderController{
    constructor(private readonly orderService: OrderService){}

    @Get()
    async getOrder(){
        return this.orderService.getOrder()
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getOrderbyId(@Param('id', ParseUUIDPipe) id:string){
        return this.orderService.getOrderbyId(id)
    }

    @Post()
    @UseGuards(AuthGuard)
    async addOrder(@Body() data){
        return this.orderService.addOrder(data)
    }
}