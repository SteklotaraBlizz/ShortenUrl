import { Test, TestingModule } from '@nestjs/testing';

import {
  CreateShortUrlRequest,
  CreateShortUrlResponse,
} from '../dto/create-url.dto';
import { GetUrlResponse } from '../dto/get-url.dto';
import { UrlController } from '../url.controller';
import { UrlService } from '../url.service';

describe('UrlController', () => {
  let urlController: UrlController;
  let urlService: UrlService;

  const mockUrlService = {
    createUrl: jest.fn(),
    findOriginalUrl: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [{ provide: UrlService, useValue: mockUrlService }],
    }).compile();

    urlController = module.get<UrlController>(UrlController);
    urlService = module.get<UrlService>(UrlService);
  });

  describe('create', () => {
    it('should successfully create a short URL', async () => {
      const request: CreateShortUrlRequest = {
        originalUrl: 'https://example.com',
        alias: 'abc123',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
      };
      const response: CreateShortUrlResponse = { shortUrl: 'short.url/abc123' };

      mockUrlService.createUrl.mockResolvedValue(response);

      const result = await urlController.create(request);
      expect(result).toEqual(response);
      expect(urlService.createUrl).toHaveBeenCalledWith(request);
    });
  });

  describe('getOriginalUrl', () => {
    it('should return the original URL successfully', async () => {
      const shortUrl = 'short.url/abc123';
      const ipAddress = '192.168.1.1';
      const response: GetUrlResponse = { originalUrl: 'https://example.com' };

      mockUrlService.findOriginalUrl.mockResolvedValue(response);

      const result = await urlController.getOriginalUrl(shortUrl, ipAddress);
      expect(result).toEqual(response);
      expect(urlService.findOriginalUrl).toHaveBeenCalledWith(
        shortUrl,
        ipAddress,
      );
    });
  });
});
