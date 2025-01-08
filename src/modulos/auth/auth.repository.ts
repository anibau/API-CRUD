import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginUserDto } from "./login.dto";

@Injectable()
export class AuthRepository{
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}
    async signup(data:CreateUserDto):Promise<User>{
        const emailUser= await this.userRepository.findOne({where:{email:data.email}});
        if(emailUser){
            throw new BadRequestException('email ya existente')
        }
        const newUser= this.userRepository.create(data);
        if(!newUser){
            throw new BadRequestException('error al crear el usuario')
        }
        await this.userRepository.save(newUser);
        return newUser
    }

    async signin(data:LoginUserDto){
        if(!data.email || !data.password){
            throw new BadRequestException('datos incompletos')
        }
        const user:User= await this.userRepository.findOne({where:{email: data.email}});
        if(!user){
            throw new BadRequestException('Invalidate credentials')
        };
        if(user.password!== data.password){
            throw new BadRequestException('Invalidate credentials')
        };
        return {message: 'login exitoso', user}
    }
}