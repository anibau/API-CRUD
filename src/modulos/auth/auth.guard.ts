import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly jwtService:JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request= context.switchToHttp().getRequest();
        const authHeader= request.headers['authorization'];
        if(!authHeader){
            throw new UnauthorizedException('Header faltante o malformado')
        }
        const token= authHeader.split(' ')[1];
        if(!token){
            throw new UnauthorizedException('token faltante o malformado')
        }
        try{
            //verificacion de firma
            const secret= process.env.JWT_SECRET;
            const payload= this.jwtService.verify(token, {secret});
            payload.iat= new Date(payload.iat*1000)
            payload.exp= new Date(payload.exp*1000)
            request.user= payload
            return true
        }catch(error){
            throw new UnauthorizedException('invalide token '+error)
        }
    }

}