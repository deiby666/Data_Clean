import { Module } from '@nestjs/common';
import { FilesService } from './Services/files.service';
import { FilesController } from './Controllers/files.controller';
import { FileMetadataService } from './Services/file.metadata.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUpload, FileUploadSchema } from './Entities/entity-file';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FileUpload.name, schema: FileUploadSchema }]),
  ],
  exports: [FilesService],
  controllers: [FilesController],
  providers: [FilesService,FileMetadataService],
})
export class FilesModule {}
