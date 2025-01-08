import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { OrderService } from "./order.service";

@Controller('orders')
export class OrderController{
    constructor(private readonly orderService: OrderService){}

    @Get()
    async getOrder(){
        return this.orderService.getOrder()
    }

    @Get(':id')
    async getOrderbyId(@Param('id', ParseUUIDPipe) id:string){
        return this.orderService.getOrderbyId(id)
    }

    @Post()
    async addOrder(@Body() data){
        return this.orderService.addOrder(data)
    }
}