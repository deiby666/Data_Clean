import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [FilesModule, LogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
