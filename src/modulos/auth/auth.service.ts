import { Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthService{
    constructor(private  readonly authRepository: AuthRepository){}
    async signup(data){
        return this.authRepository.signup(data)
    }
    async signin(data){
        return this.authRepository.signin(data)
    }
}