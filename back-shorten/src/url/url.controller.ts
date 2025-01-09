import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UrlService } from './url.service';
import { AppResponses } from 'src/decorators/app-responses.decorator';
import {
  CreateShortUrlRequest,
  CreateShortUrlResponse,
} from './dto/create-url.dto';
import { GetUrlInfoResponse, GetUrlResponse } from './dto/get-url.dto';
import { DeleteUrlResponse } from './dto/delete-url.dto';
import { MainExceptionFilter } from '../exceptions/main-exception.filter';

@Controller('url')
@UseFilters(MainExceptionFilter)
@ApiTags('Url shorten')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  @AppResponses({ status: 201, type: CreateShortUrlResponse })
  async create(@Body() req: CreateShortUrlRequest) {
    return this.urlService.createUrl(req);
  }

  @Get(':shortUrl')
  @AppResponses({ status: 200, type: GetUrlResponse })
  async getOriginalUrl(@Param('shortUrl') shortUrl: string) {
    return this.urlService.findOriginalUrl(shortUrl);
  }

  @Get('info/:shortUrl')
  @AppResponses({ status: 200, type: GetUrlInfoResponse })
  async getUrlInfo(@Param('shortUrl') shortUrl: string) {
    return this.urlService.findUrlInfo(shortUrl);
  }

  @Delete(':shortUrl')
  @AppResponses({ status: 200, type: DeleteUrlResponse })
  async deleteUrl(@Param('shortUrl') shortUrl: string) {
    return this.urlService.deleteUrl(shortUrl);
  }
}
