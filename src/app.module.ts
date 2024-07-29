import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { ApikeyModule } from './apikey/apikey.module';


@Module({
  imports: [FilesModule, ApikeyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
