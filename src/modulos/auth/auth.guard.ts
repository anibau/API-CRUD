import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request= context.switchToHttp().getRequest();
        const authHeader= request.headers['authorization'];
        if(!authHeader){
            throw new UnauthorizedException('Header faltante o malformado')
        }
        const token= authHeader.split(' ')[1];
        if(!token){
            throw new UnauthorizedException('token faltante o malformado')
        }; 
        
        return true
    }

}