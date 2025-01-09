import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { UrlEntity } from './entities/url.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AliasModule } from 'src/alias/alias.module';
import { IpRecordModule } from 'src/ip-records/ip-record.module';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity]), AliasModule, IpRecordModule],
  providers: [UrlService],
  controllers: [UrlController],
  exports: [UrlService],
})
export class UrlModule {}
