import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileUploadDocument = FileUpload & Document;

@Schema({ timestamps: true })
export class FileUpload {
  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  originalName: string;

  @Prop({ required: true })
  file: string;
}

export const FileUploadSchema = SchemaFactory.createForClass(FileUpload);
