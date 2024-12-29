import { registerAs } from "@nestjs/config"
import { configDotenv } from "dotenv"
import { Category } from "src/modulos/categories/category.entity"
import { OrderDetail } from "src/modulos/orderDetail/orderDetail.entity"
import { Order } from "src/modulos/orders/order.entity"
import { Product } from "src/modulos/products/product.entity"
import { User } from "src/modulos/users/entities/user.entity"
import { DataSourceOptions } from "typeorm"

configDotenv({path:'.env'})

const config: DataSourceOptions ={
    type:'postgres',
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_Port,10),
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [User, Product, Category, Order, OrderDetail],
    synchronize:true,
    //dropSchema:true,
    logging: false
}
export default registerAs('typeorm', ()=>config )