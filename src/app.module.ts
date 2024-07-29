import { Module } from '@nestjs/common';
import { ApikeyModule } from './apikey/apikey.module';

@Module({
  imports: [ApikeyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
