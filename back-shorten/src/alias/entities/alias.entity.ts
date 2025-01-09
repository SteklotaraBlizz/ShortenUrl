import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('alias')
export class AliasEntity {
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Column({ type: 'varchar', length: 20 })
  public alias: string;
}
