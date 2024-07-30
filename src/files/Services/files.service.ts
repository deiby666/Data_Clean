import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { FileMetadataService } from './file.metadata.service';

@Injectable()
export class FilesService {
  private s3Client: S3Client;

  constructor(
    private readonly fileMetadataService: FileMetadataService,
    private readonly configService: ConfigService,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFile(
    fileName: string,
    file: Buffer,
    ip: string,
    removeDuplicates: boolean,
    strictFormat: boolean,
    sortBy: string,
    sortOrder: string,
  ): Promise<string> {
    const processedFile = await this.processFile(
      file,
      removeDuplicates,
      strictFormat,
      sortBy,
      sortOrder,
    );

    const txtFileName = fileName.replace('.csv', '.txt');

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
        Key: txtFileName,
        Body: processedFile,
        ContentType: 'text/plain',
      }),
    );

    await this.fileMetadataService.createFileMetadata(
      ip,
      fileName,
      file,
      `https://${this.configService.getOrThrow('AWS_S3_BUCKET')}.s3.amazonaws.com/${txtFileName}`,
    );

    return `https://${this.configService.getOrThrow('AWS_S3_BUCKET')}.s3.amazonaws.com/${txtFileName}`;
  }

  private async processFile(
    file: Buffer,
    removeDuplicates: boolean,
    strictFormat: boolean,
    sortBy: string,
    sortOrder: string,
  ): Promise<Buffer> {
    const results: any[] = [];
    const parser = file
      .toString()
      .split('\n')
      .map((line) => line.split(','));

    parser.forEach((row, index) => {
      if (index === 0) return;
      if (strictFormat && row.some((cell) => !cell))
        throw new Error('File format is not strict');
      results.push(row);
    });

    if (removeDuplicates) {
      const uniqueResults = results.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.join() === value.join()),
      );
      results.length = 0;
      results.push(...uniqueResults);
    }

    if (sortBy) {
      const columnIndex = parser[0].indexOf(sortBy);
      if (columnIndex === -1)
        throw new Error('Invalid column name for sorting');

      results.sort((a, b) => {
        const valueA = a[columnIndex];
        const valueB = b[columnIndex];

        if (sortOrder === 'asc') {
          return valueA.localeCompare(valueB);
        } else if (sortOrder === 'desc') {
          return valueB.localeCompare(valueA);
        } else {
          throw new Error('Invalid sort order');
        }
      });
    }

    const processedFile = results.map((row) => row.join('\t')).join('\n');
    return Buffer.from(processedFile);
  }
}
