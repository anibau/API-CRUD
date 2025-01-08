import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { validateUser } from "src/utils/validateUser";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginUserDto } from "./login.dto";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){}
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() data:CreateUserDto){
        try{
            if(validateUser(data)){
                return this.authService.signup(data)
            }
        }catch(err){
            throw new BadRequestException('ERROR al crear usuario '+err)
        }
    }
    @Post('signin')
    @HttpCode(HttpStatus.ACCEPTED)
    async signin(@Body() data:LoginUserDto){
        try{
            return this.authService.signin(data)
        }catch(err){
            throw new BadRequestException('ERROR: login insatisfactorio '+err)
        }
    }
}