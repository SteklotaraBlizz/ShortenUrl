import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from './entities/url.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { shortUrlPrefix } from '../constants/short-prefix.constant';
import {
  CreateShortUrlRequest,
  CreateShortUrlResponse,
} from './dto/create-url.dto';
import { AliasService } from '../alias/alias.service';
import {
  GetUrlInfoResponse,
  GetUrlRelatedIpAddressesResponse,
  GetUrlResponse,
} from './dto/get-url.dto';
import { MainException } from '../exceptions/main.exception';
import { DeleteUrlResponse } from './dto/delete-url.dto';
import { IpRecordService } from '../ip-records/ip-record.service';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
    private readonly aliasService: AliasService,
    private readonly ipService: IpRecordService,
  ) {}

  async createUrl(
    request: CreateShortUrlRequest,
  ): Promise<CreateShortUrlResponse> {
    const shortUrl = request.alias
      ? await this.generateShortUrl(request.alias)
      : await this.generateShortUrl();

    const createdUrl = await this.urlRepository.create({
      originalUrl: request.originalUrl,
      shortUrl: shortUrl,
      expiresAt: new Date(request.expiresAt),
      clickCount: 0,
    });

    const savedUrl = await this.urlRepository.save(createdUrl);
    return new CreateShortUrlResponse(savedUrl.shortUrl);
  }

  async findOriginalUrl(
    shortUrl: UrlEntity['shortUrl'],
    ipAddress: string,
  ): Promise<GetUrlResponse> {
    const response = await this.urlRepository.findOne({
      where: {
        shortUrl: shortUrl,
      },
    });

    if (!response)
      throw MainException.entityNotFound(
        `Original url for short url ${shortUrl} not found`,
      );

    const currentDate = new Date();
    if (currentDate > response.expiresAt)
      throw MainException.gone(`${shortUrl} has been expired`);

    await this.updateUrlClickCount(response);
    await this.ipService.createIpRecord(ipAddress, response);
    return new GetUrlResponse(response.originalUrl);
  }

  async findUrlInfo(
    shortUrl: UrlEntity['shortUrl'],
  ): Promise<GetUrlInfoResponse> {
    const urlInfo = await this.urlRepository.findOne({
      where: {
        shortUrl: shortUrl,
      },
    });

    if (!urlInfo)
      throw MainException.entityNotFound(
        `Url info for short url ${shortUrl} not found`,
      );

    return new GetUrlInfoResponse(urlInfo);
  }

  async findRelatedIpAddresses(shortUrl: UrlEntity['shortUrl']) {
    const urlInfo = await this.urlRepository.findOne({
      where: {
        shortUrl: shortUrl,
      },
    });

    const records = await this.ipService.findLastFiveAddresses(urlInfo.id);

    return new GetUrlRelatedIpAddressesResponse(urlInfo.clickCount, records);
  }

  async deleteUrl(shortUrl: UrlEntity['shortUrl']): Promise<DeleteUrlResponse> {
    const url = await this.urlRepository.findOne({
      where: {
        shortUrl: shortUrl,
      },
    });

    if (!url)
      throw MainException.entityNotFound(
        `Url info for short url ${shortUrl} not found`,
      );
    const { affected } = await this.urlRepository.delete(url.id);
    return new DeleteUrlResponse(!!affected);
  }

  private async generateShortUrl(alias?: string): Promise<string> {
    if (alias) {
      await this.aliasService.checkIfAliasIsOriginal(alias);
      return shortUrlPrefix + alias;
    }
    const input = Math.random().toString();
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    return shortUrlPrefix + hash.slice(0, 6);
  }

  private async updateUrlClickCount(url: UrlEntity) {
    url.clickCount += 1;
    await this.urlRepository.save(url);
  }
}
