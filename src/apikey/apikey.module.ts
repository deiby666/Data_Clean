import { Module } from '@nestjs/common';
import { ApikeyService } from './apikey.service';
import { ApikeyController } from './apikey.controller';

@Module({
  controllers: [ApikeyController],
  providers: [ApikeyService],
})
export class ApikeyModule {}
