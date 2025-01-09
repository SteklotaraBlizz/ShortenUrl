import { ApiProperty } from '@nestjs/swagger';

export class DeleteUrlResponse {
  @ApiProperty()
  public deleted: boolean;

  constructor(deleted: boolean) {
    this.deleted = deleted;
  }
}
