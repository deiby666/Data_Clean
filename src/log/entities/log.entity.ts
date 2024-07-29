import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Log extends Document {
  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  apiKey: string;

  @Prop({ required: true })
  endpoint: string;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  action: string;

  @Prop({ default: null })
  fileId?: string;

  @Prop({ default: null })
  fileType?: string;

  @Prop({ required: true })
  responseStatus: number;

  @Prop({ required: true })
  responseTime: number;

  @Prop({ default: null })
  details?: string;

  @Prop({ default: null })
  createdAt?: Date;

  @Prop({ default: null })
  updatedAt?: Date;

  @Prop({ default: null })
  deletedAt: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
