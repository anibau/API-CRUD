import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus, BadRequestException, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { validateUser } from 'src/utils/validateUser';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Role, Roles } from '../auth/role.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dataUser: CreateUserDto) {
    try{
      if(validateUser(dataUser)){
        return this.usersService.create(dataUser);
      } else{throw new BadRequestException('datos incompletos')}
      }catch(err){
        throw new BadRequestException('error al crear el users '+ err)
      }
    } 

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  async findAll(@Query('page') page:number= 1, @Query('limit') limit:number=5){
    try{
      return await this.usersService.findAll(page, limit);
    }catch(err){
      throw new BadRequestException('ERROR al obtener usuarios '+err)
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try{
      return  await this.usersService.findOne(id);
    }catch(err){
      throw new BadRequestException('ERROR al obtener usuario '+err)
    }
  }
  
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async update(@Param('id', ParseUUIDPipe) id:string, @Body() dataUser:CreateUserDto){
    try{
      return this.usersService.update(id, dataUser)
    }catch(err){
      throw new BadRequestException('ERROR al actualizar usuario '+err)
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try{
      return this.usersService.remove(id);
    }catch(err){
      throw new BadRequestException('ERROR al eliminar usuario '+err)
    }
  }
}
