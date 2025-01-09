import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateShortUrlRequest {
  @ApiProperty()
  @IsDefined()
  @IsUrl()
  @Length(1, 512)
  public originalUrl: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 20)
  public alias?: string;

  @ApiProperty()
  @IsDate()
  @IsDefined()
  public expiresAt: Date;
}

export class CreateShortUrlResponse {
  @ApiProperty()
  @IsString()
  shortUrl: string;

  constructor(shortUrl: string) {
    this.shortUrl = shortUrl;
  }
}
