import {
  Controller,
  FileTypeValidator,
  HttpException,
  HttpStatus,
  ParseFilePipe,
  Post,
  UploadedFile,
  Query,
  UseInterceptors,
  Res,
  Req,
} from '@nestjs/common';
import { FilesService } from '../Services/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';
import * as CircularJSON from 'circular-json';

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
    @Query('removeDuplicates') removeDuplicates: string,
    @Query('strictFormat') strictFormat: string,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: string,
  ) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    try {
      const ip =
        (req.headers['x-forwarded-for'] as string) ||
        req.connection.remoteAddress ||
        '';

      const txtFileUrl = await this.filesService.uploadFile(
        file.originalname,
        file.buffer,
        ip as string,
        removeDuplicates === 'true',
        strictFormat === 'true',
        sortBy,
        sortOrder,
      );

      const responseObject = {
        message: 'File processed and uploaded successfully!',
        fileUrl: txtFileUrl,
      };

      const jsonString = CircularJSON.stringify(responseObject);
      return res.status(HttpStatus.OK).send(jsonString);
    } catch (error) {
      console.error('Error processing file:', error);
      throw new HttpException(
        'Error processing file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
