import { BadRequestException, Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(private readonly fileService:FilesService ){}

    @Post('uploadImage/:id')
    async uploadImage(@Body() data, @Param('id', ParseUUIDPipe) id:string){
        try{
            return this.fileService.uploadImage(data, id)
        }catch(err){
            throw new BadRequestException('error al cargar el archivo '+err)
        }
    }
}
