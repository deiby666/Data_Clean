import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LogService } from 'src/log/service/log.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly logsService: LogService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    const endpoint = request.url;
    const method = request.method;
    const ip = request.ip;

    try {
      if (!apiKey) {
        await this.logsService.logRequest(
          ip,
          'undefined',
          endpoint,
          method,
          'Unauthorized Access',
          null,
          null,
          401,
          0,
          'API key is missing',
        );
        throw new UnauthorizedException('API key is missing');
      }

      if (apiKey !== process.env.API_KEY) {
        await this.logsService.logRequest(
          ip,
          apiKey,
          endpoint,
          method,
          'Unauthorized Access',
          null,
          null,
          401,
          0,
          'API key is invalid',
        );
        throw new UnauthorizedException('API key is invalid');
      }

      return true;
    } catch (error) {
      await this.logsService.logRequest(
        ip,
        apiKey || 'undefined',
        endpoint,
        method,
        'Error during API key validation',
        null,
        null,
        500,
        0,
        error.message,
      );
      throw error;
    }
  }
}
