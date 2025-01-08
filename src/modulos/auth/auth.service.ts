import { Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { LoginUserDto } from "./login.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService{
    constructor(private  readonly authRepository: AuthRepository){}
    async signup(data:CreateUserDto){
        return this.authRepository.signup(data)
    }
    async signin(data:LoginUserDto){
        return this.authRepository.signin(data)
    }
}