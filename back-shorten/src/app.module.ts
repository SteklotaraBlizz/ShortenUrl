import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UrlModule } from './url/url.module';
import { ConfigModule } from '@nestjs/config';
import { AliasModule } from './alias/alias.module';
import { IpRecordModule } from './ip-records/ip-record.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UrlModule,
    AliasModule,
    IpRecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
