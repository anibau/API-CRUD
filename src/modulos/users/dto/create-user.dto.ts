import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MaxLength(15)
    @IsStrongPassword({
        minLength:8,
        minUppercase:1,
        minLowercase:1,
        minNumbers:1,
        minSymbols:1,
    })
    password: string

    @IsNotEmpty()
    @MaxLength(15)
    @IsStrongPassword({
        minLength:8,
        minUppercase:1,
        minLowercase:1,
        minNumbers:1,
        minSymbols:1,
    })
    confirmPassword:string

    @IsNotEmpty()
    @IsNumber()
    phone:number

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country:string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city:string
}
