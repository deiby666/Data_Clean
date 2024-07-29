import {
  Controller,
  FileTypeValidator,
  HttpException,
  HttpStatus,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from '../Services/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
/* import { CreateFileUploadDto } from '../dtos/create-file-dto'; */

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'csv' })],
      }),
    )
    file: Express.Multer.File,
    /* @Body() createFileUploadDto: CreateFileUploadDto,
    @Res() res: Response,
    @Req() req: Request,  */
  ) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    console.log(file);

    await this.filesService.uploadFile(file.originalname, file.buffer);

    /*  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null); */
  }
}
