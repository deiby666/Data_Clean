import { Module } from '@nestjs/common';
import { ApikeyService } from './apikey.service';
import { ApikeyController } from './apikey.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Apikey, apikeySchema } from './entities/apikey.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Apikey.name, schema: apikeySchema },
    ]),
  ],
  controllers: [ApikeyController],
  providers: [ApikeyService],
})
export class ApikeyModule {}
