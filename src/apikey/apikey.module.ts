import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Apikey, apikeySchema } from './entities/apikey.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Apikey.name, schema: apikeySchema }]),
  ],
  controllers: [],
  providers: [],
})
export class ApikeyModule {}
