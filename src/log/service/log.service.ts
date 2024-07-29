import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from '../entities/log.entity';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  async logRequest(
    ip: string,
    apiKey: string,
    endpoint: string,
    method: string,
    action: string,
    fileId?: string,
    fileType?: string,
    responseStatus?: number,
    responseTime?: number,
    details?: string,
  ): Promise<void> {
    try {
      const log = await new this.logModel({
        ip,
        apiKey,
        endpoint,
        method,
        action,
        fileId,
        fileType,
        responseStatus,
        responseTime,
        details,
      });
      await log.save();
    } catch (error) {
      console.error('Error logging request:', error);
    }
  }

  async getLogs(page: number, limit: number, sort: 'asc' | 'desc') {
    try {
      const skip = (page - 1) * limit;
      const sortOrder = sort === 'asc' ? 1 : -1;
      const logs = await this.logModel
        .find()
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(limit)
        .exec();

      if (!logs) {
        throw new HttpException('No logs found', HttpStatus.NOT_FOUND);
      }
      const totalLogs = await this.logModel.countDocuments().exec();
      return { logs, totalLogs };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteLog(logId: string): Promise<void> {
    await this.logModel.findByIdAndDelete(logId).exec();
  }
}
