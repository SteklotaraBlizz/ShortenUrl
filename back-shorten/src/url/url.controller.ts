import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('Url controller')
@ApiTags('Url shorten')
export class UrlController {}
