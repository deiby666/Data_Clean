import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileUpload, FileUploadDocument } from '../Entities/entity-file';


@Injectable()
export class FileMetadataService {
  constructor(
    @InjectModel(FileUpload.name) private readonly fileMetadataModel: Model<FileUploadDocument>,
  ) {}

  async createFileMetadata(ip: string, originalNameCsv: string, csvFile: Buffer, txtFileUrl: string): Promise<FileUpload> {
    const fileMetadata = new this.fileMetadataModel({ ip, originalNameCsv, csvFile, txtFileUrl });
    return fileMetadata.save();
  }
}
