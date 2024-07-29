import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { LogModule } from './log/log.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/db-config';
import { PersistenceModule } from './libs/persistence';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LogIterceptor } from './log/Interceptor/log.interceptor';
import { ApiKeyGuard } from './libs/guards/api-key.guard';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    FilesModule,
    LogModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LogIterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {}
