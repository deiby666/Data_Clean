import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LogService } from '../service/log.service';

@Injectable()
export class LogIterceptor implements NestInterceptor {
  constructor(private readonly logsService: LogService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    try {
      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();
      const ip = request.ip;
      const apiKey = request.headers['x-api-key'] || 'undefined';
      const endpoint = request.url;
      const method = request.method;
      const startTime = Date.now();

      return next.handle().pipe(
        tap(async (responseBody) => {
          const responseTime = Date.now() - startTime;
          const responseStatus = response.statusCode;
          const fileId = request.fileId || null;
          const fileType = request.fileType || null;

          await this.logsService.logRequest(
            ip,
            apiKey,
            endpoint,
            method,
            'Request',
            fileId,
            fileType,
            responseStatus,
            responseTime,
            `Response: ${JSON.stringify(responseBody)}`,
          );
        }),
        catchError(async (err) => {
          const responseTime = Date.now() - startTime;
          await this.logsService.logRequest(
            ip,
            apiKey,
            endpoint,
            method,
            'Error',
            null,
            null,
            response.statusCode || 500,
            responseTime,
            `Error: ${err.message}`,
          );
          return throwError(err);
        }),
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
