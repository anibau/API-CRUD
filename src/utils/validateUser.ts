import { CreateUserDto } from "src/modulos/users/dto/create-user.dto";

export function validateUser(data: CreateUserDto){
    const validate= data.name !== undefined && data.email !== undefined && data.password !== undefined;
    return validate
}