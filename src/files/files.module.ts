import { Module } from '@nestjs/common';
import { FilesService } from './Services/files.service';
import { FilesController } from './Controllers/files.controller';
import {  ThrottlerModule } from '@nestjs/throttler';


@Module({
  exports: [FilesService],
  controllers: [FilesController],
  providers: [
    FilesService
  ],
})
export class FilesModule {}
