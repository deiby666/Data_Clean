import { Module } from '@nestjs/common';
import { FilesService } from './Services/files.service';
import { FilesController } from './Controllers/files.controller';

@Module({
  exports: [FilesService],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
