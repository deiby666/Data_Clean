import { Controller, FileTypeValidator, HttpException, HttpStatus, ParseFilePipe, Post, UploadedFile, UseInterceptors, Res, Req } from '@nestjs/common';
import { FilesService } from '../Services/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';

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
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    try {
      
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
      
      
      const txtFileUrl = await this.filesService.uploadFile(file.originalname, file.buffer, ip as string);
      
      
      return res.status(HttpStatus.OK).json({
        message: 'File uploaded successfully!',
        fileUrl: txtFileUrl,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new HttpException('Error uploading file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
