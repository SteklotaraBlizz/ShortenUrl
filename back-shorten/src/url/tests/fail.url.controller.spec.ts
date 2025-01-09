import { Test, TestingModule } from '@nestjs/testing';

import { CreateShortUrlRequest } from '../dto/create-url.dto';
import { UrlController } from '../url.controller';
import { UrlService } from '../url.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UrlController Fail', () => {
  let urlController: UrlController;

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
  });

  describe('create', () => {
    it('should not successfully create a short URL', async () => {
      const request: CreateShortUrlRequest = {
        originalUrl: 'https://example.com',
        alias: 'existingAlias', // существующий alias
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
      };

      mockUrlService.createUrl.mockImplementation(() => {
        throw new BadRequestException('Alias already exists');
      });

      await expect(urlController.create(request)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getOriginalUrl', () => {
    it('should not return the original URL successfully', async () => {
      const shortUrl = 'nonexistent.short.ly';
      const ipAddress = '192.168.1.1';

      mockUrlService.findOriginalUrl.mockImplementation(() => {
        throw new NotFoundException(`Short URL ${shortUrl} not found`);
      });

      await expect(
        urlController.getOriginalUrl(shortUrl, ipAddress),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
