import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { LogModule } from './log/log.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/db-config';
import { PersistenceModule } from './libs/persistence';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    FilesModule,
    LogModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
