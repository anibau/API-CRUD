import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { OrderDetailService } from "./orderDetail.service";

@Controller('orderDetail')
export class OrderDetailsController{
    constructor(private readonly orderDetailService:OrderDetailService){}

    @Get()
    async getOrderDetail(){
        return this.orderDetailService.getOrderDetail()
    }

    
    @Get(':id')
    async getOrderDetailbyId(@Param('id', ParseUUIDPipe) id:string){
        return this.orderDetailService.getOrderDetailbyId(id)
    }

    @Post()
    async addOrderDetail(@Body() data){
        return this.orderDetailService.addOrderDetail(data)
    }

}