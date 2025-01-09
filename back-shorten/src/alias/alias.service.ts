import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AliasEntity } from './entities/alias.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AliasService {
  constructor(
    @InjectRepository(AliasEntity)
    private readonly aliasRepository: Repository<AliasEntity>,
  ) {}

  async createAlias(alias: string) {
    const createdAlias = await this.aliasRepository.create({
      alias: alias,
    });

    const savedAlias = await this.aliasRepository.save(createdAlias);
    return savedAlias;
  }

  async checkIfAliasIsOriginal(alias: string) {
    if (
      await this.aliasRepository.findOne({
        where: {
          alias: alias,
        },
      })
    )
      throw new HttpException('ALias already exists', 400);
    await this.createAlias(alias);
  }
}
