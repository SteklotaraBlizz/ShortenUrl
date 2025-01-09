import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';
import { UrlEntity } from '../entities/url.entity';
import { IpRecordEntity } from 'src/ip-records/entities/ip-record.entity';

export class GetUrlResponse {
  @ApiProperty()
  @IsUrl()
  public originalUrl: string;

  constructor(originalUrl: string) {
    this.originalUrl = originalUrl;
  }
}

export class GetUrlInfoResponse {
  @ApiProperty()
  public urlInfo: UrlEntity;

  constructor(urlInfo: UrlEntity) {
    this.urlInfo = urlInfo;
  }
}

export class GetUrlRelatedIpAddressesResponse {
  @ApiProperty()
  public clickCount: number;

  @ApiProperty()
  public ipAdresses: IpRecordEntity[];

  constructor(clickCount: number, ipAdresses: IpRecordEntity[]) {
    this.clickCount = clickCount;
    this.ipAdresses = ipAdresses;
  }
}
