import { CreateUserDto } from "src/modulos/users/dto/create-user.dto";

export function validateUser(data: CreateUserDto){
    const validate= data.name !== undefined && data.email !== undefined && data.password !== undefined && data.confirmPassword !==undefined && data.confirmPassword === data.password && data.phone !== undefined && data.country !== undefined && data.city !== undefined && data.address !==undefined;
    return validate
}