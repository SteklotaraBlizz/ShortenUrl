import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AliasEntity } from './entities/alias.entity';
import { AliasService } from './alias.service';

@Module({
  imports: [TypeOrmModule.forFeature([AliasEntity])],
  providers: [AliasService],
  exports: [AliasService],
})
export class AliasModule {}
