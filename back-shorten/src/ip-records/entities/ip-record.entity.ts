import { ApiProperty } from '@nestjs/swagger';
import { UrlEntity } from '../../url/entities/url.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ip-records')
export class IpRecordEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  public readonly createdAt!: Date;

  @ApiProperty()
  @Column({ type: 'varchar', length: 64 })
  public ipAddress: string;

  @ApiProperty({ type: () => UrlEntity })
  @ManyToOne(() => UrlEntity)
  @JoinColumn({ name: 'urlId' })
  public url!: UrlEntity;

  @ApiProperty()
  @Column({ name: 'urlId' })
  public urlId!: string;
}
