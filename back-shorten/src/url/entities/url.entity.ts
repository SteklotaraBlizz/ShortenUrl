import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('urls')
export class UrlEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  public readonly createdAt!: Date;

  @ApiProperty()
  @Column({ type: 'varchar', length: 128 })
  public shortUrl: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 512 })
  public originalUrl: string;

  @ApiProperty()
  @Column({ type: 'integer' })
  public clickCount: number;

  @ApiProperty()
  @Column()
  public expiresAt: Date;
}
