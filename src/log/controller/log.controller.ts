import { Controller, Get, Query, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { LogService } from '../service/log.service';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logService: LogService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all logs with pagination and sorting' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: ['asc', 'desc'],
    example: 'desc',
  })
  async getAllLogs(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
  ) {
    return await this.logService.getLogs(page, limit, sort);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a log by ID' })
  @ApiParam({ name: 'id', required: true, type: String })
  async deleteLog(@Param('id') logId: string): Promise<{ message: string }> {
    await this.logService.deleteLog(logId);
    return { message: 'Record successfully deleted' };
  }
}
