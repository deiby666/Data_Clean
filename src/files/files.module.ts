import { Module } from '@nestjs/common';
import { FilesService } from './Services/files.service';
import { FilesController } from './Controllers/files.controller';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ThrottlerModule.forRoot()],
  exports: [FilesService],
  controllers: [FilesController],
  providers: [
    FilesService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class FilesModule {}
