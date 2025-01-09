import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginUserDto } from "./login.dto";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthRepository{
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService){}


    async signup(data:CreateUserDto):Promise<Partial<User>>{
        const emailUser= await this.userRepository.findOne({where:{email:data.email}});
        if(emailUser){
            throw new BadRequestException('email ya existente')
        }else if(data.password !== data.confirmPassword){
            throw new BadRequestException('data password do not match')
        }

        const hashedPassword= await bcrypt.hash(data.password,10);
        console.log(hashedPassword)
        if(!hashedPassword){
            throw new BadRequestException('error: password not hashed ')
        }
        const newUser= this.userRepository.create({...data, password:hashedPassword});
        if(!newUser){
            throw new BadRequestException('error al crear el usuario')
        }
        await this.userRepository.save(newUser);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const{password, isAdmin, ...restUser}= newUser
        return restUser
    }

    async signin(data:LoginUserDto){
        if(!data.email || !data.password){
            throw new BadRequestException('datos incompletos')
        }
        const user:User= await this.userRepository.findOne({where:{email: data.email}});
        if(!user){
            throw new BadRequestException('Invalidate credentials1')
        };
        const comparePassword= await bcrypt.compare(data.password, user.password);
        if(!comparePassword){
            throw new BadRequestException('Invalidate credentials2')
        };
        //token
        const userPayload= {
            sub: user.id,
            id:user.id,
            email: user.email
            //role: [user.isAdmin? ]
        };
        const token= this.jwtService.sign(userPayload);

        return {message: 'login exitoso', token}
    }
}