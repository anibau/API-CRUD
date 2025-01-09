import { BadRequestException, Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
    constructor(private readonly fileService:FilesService ){}

    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage( @Param('id', ParseUUIDPipe) id:string, @UploadedFile(new ParseFilePipe({validators:[
        new MaxFileSizeValidator({maxSize:200000, message: 'la imagen debe ser menor a 200k'}),
        new FileTypeValidator({fileType:/(jpeg|jpg|png|webp)$/})
    ]})) data:Express.Multer.File){
        try{
            return this.fileService.uploadImage(data, id)
        }catch(err){
            throw new BadRequestException('error al cargar el archivo '+err)
        }
    }
}
