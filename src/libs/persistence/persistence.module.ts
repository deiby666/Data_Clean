import { ConfigType } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from './db-config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dbConfig>) => {
        const { db } = configService;
        const uriDb =  `mongodb+srv://${db.user}:${db.password}@teamsix.lakqkyb.mongodb.net/`;
        return {
          uri: uriDb,
        };
      },
      inject: [dbConfig.KEY],
    }),
  ],
})
export class PersistenceModule {}
