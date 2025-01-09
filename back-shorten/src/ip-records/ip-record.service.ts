import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IpRecordEntity } from './entities/ip-record.entity';
import { Repository } from 'typeorm';
import { UrlEntity } from 'src/url/entities/url.entity';

@Injectable()
export class IpRecordService {
  constructor(
    @InjectRepository(IpRecordEntity)
    private readonly ipRepository: Repository<IpRecordEntity>,
  ) {}

  async createIpRecord(ipAddress: string, url: UrlEntity) {
    const createdIpAddress = await this.ipRepository.create({
      url: url,
      ipAddress: ipAddress,
    });

    await this.ipRepository.save(createdIpAddress);
  }

  async findLastFiveAddresses(urlId: UrlEntity['id']) {
    return this.ipRepository
      .createQueryBuilder('ip-records')
      .where('ip-records.urlId = :urlId', { urlId })
      .orderBy('ip-records.createdAt', 'DESC')
      .take(5)
      .getMany();
  }
}
