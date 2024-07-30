import { Module } from '@nestjs/common';
import { FilesService } from './Services/files.service';
import { FilesController } from './Controllers/files.controller';
import { FileMetadataService } from './Services/file.metadata.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUpload, FileUploadSchema } from './Entities/entity-file';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FileUpload.name, schema: FileUploadSchema },
    ]),
  ],
  exports: [FilesService],
  controllers: [FilesController],
  providers: [FilesService, FileMetadataService, S3Client],
})
export class FilesModule {}
