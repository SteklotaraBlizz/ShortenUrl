import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpRecordEntity } from './entities/ip-record.entity';
import { IpRecordService } from './ip-record.service';

@Module({
  imports: [TypeOrmModule.forFeature([IpRecordEntity])],
  providers: [IpRecordService],
  exports: [IpRecordService],
})
export class IpRecordModule {}
