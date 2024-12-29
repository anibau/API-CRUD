import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
//import { UpdateUserDto } from './dto/update-user.dto';

const users=[{
  id: '1',
  name: 'ani',
  email: 'ani@gmail.com',
  password: 'ani1992*',
}, {
  id: '2',
  name: 'ani',
  email: 'ani@gmail.com',
  password: 'ani1992*',
}, {
  id: '3',
  name: 'ani',
  email: 'ani@gmail.com',
  password: 'ani1992*',
}, {
  id: '4',
  name: 'ani',
  email: 'ani@gmail.com',
  password: 'ani1992*',
}, {
  id: '5',
  name: 'ani',
  email: 'ani@gmail.com',
  password: 'ani1992*',
}
]

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository:Repository<User>){}


  create(createUserDto: CreateUserDto) {
    const idUser= users.length+1;
    const stringId= idUser.toString();
    const newUser={
      id: stringId,
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password
    };
    users.push(newUser)
    return newUser
  }

  async findAll(page:number, limit:number):Promise<User[]> {
    const initialPage= (page-1)*limit;
    const lastPage= initialPage+limit

    const users= await this.userRepository.find();
    if(!users){
      throw new BadRequestException('usuarios no encontrados')
    }
    return users.slice(initialPage, lastPage);
  }

  async findOne(id: string):Promise<User> {
    // const user= users.find((user)=>user.id=== id)
    const user= await this.userRepository.findOne({where:{id:id}});
    if(!user){
      throw new BadRequestException('usuario no encontrado')
    }
    return user ;
  }

  async update(id: string, updateUserDto: CreateUserDto) {
    // const user= users.find((user)=>user.id===id);
    // user.name= updateUserDto.name;
    // user.email=updateUserDto.email;
    // user.password= updateUserDto.password;
    const user= await this.userRepository.findOne({where:{id: id}});
    if(!user){
      throw new BadRequestException('usuario no encontrado')
    };
    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);
    return {message: 'actualizacion exitosa',user};
  }

  async remove(id: string) {
    // const user= users.filter((user)=>user.id !== id);
    const user= await this.userRepository.findOne({where: {id:id}});
    if(!user){
      throw new BadRequestException('usuario no encontrado')
    }; 
    await this.userRepository.remove(user);
    return 'eliminacion de usuario exitosa';
  }
}
