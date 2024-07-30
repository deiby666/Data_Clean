import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileMetadataService } from './file.metadata.service';

@Injectable()
export class FilesService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });
  constructor(
    private readonly configService: ConfigService,
    private readonly fileMetadataService: FileMetadataService) {}

    async uploadFile(fileName: string, file: Buffer, ip: string): Promise<string> {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
          Key: fileName,
          Body: file,
        }),
      );

      const txtFileUrl = `https://${this.configService.getOrThrow('AWS_S3_BUCKET')}.s3.amazonaws.com/${fileName.replace('.csv', '.txt')}`;

      await this.fileMetadataService.createFileMetadata(ip, fileName, file, txtFileUrl);

    return txtFileUrl;
    }

  private removeDuplicates(rows: any[]): void {
    const uniqueRows = Array.from(
      new Set(rows.map((row) => JSON.stringify(row))),
    ).map((row) => JSON.parse(row));
    rows.length = 0;
    rows.push(...uniqueRows);
  }

  private validateStrict(rows: any[]): void {
    const columnCount = Object.keys(rows[0]).length;
    rows.forEach((row) => {
      if (
        Object.values(row).some(
          (value) => value === '' || value === null || value === undefined,
        )
      ) {
        throw new HttpException(
          'File format is invalid',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (Object.keys(row).length !== columnCount) {
        throw new HttpException(
          'File format is inconsistent',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }
}