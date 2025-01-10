import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "./role.decorator";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private readonly reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const getRoles= this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()]);

        const request= context.switchToHttp().getRequest();
        const user= request.user;
        console.log(user);
        console.log(user.roles);

        const valid= user && user.roles && getRoles.some((role)=>user.roles.includes(role));

        // const hasRole= ()=>requiredRoles.some((role)=>user.roles.includes(role));
        // const valid= user && user.roles && hasRole();
        console.log(valid)
        if(!valid){
            throw new UnauthorizedException('ruta no autorizada')
        }
        return valid    
    }   
}