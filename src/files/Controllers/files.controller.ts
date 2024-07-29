import { Controller } from '@nestjs/common';
import { FilesService } from '../Services/files.service';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
}
