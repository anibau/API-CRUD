import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
    constructor(){}

    uploadImage(data: any, id: string) {
        throw new Error('Method not implemented.');
    }
}
