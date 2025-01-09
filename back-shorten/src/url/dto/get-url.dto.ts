import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';
import { UrlEntity } from '../entities/url.entity';

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
