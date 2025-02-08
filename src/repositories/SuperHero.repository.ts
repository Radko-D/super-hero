import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaginationOptions, SuperHero } from '../models'

@Injectable()
export class SuperHeroRepository {
  constructor(
    @InjectRepository(SuperHero)
    private readonly superHeroRepository: Repository<SuperHero>,
  ) {}

  async createSuperHero(superHero: Partial<SuperHero>) {
    return await this.superHeroRepository.save(superHero)
  }

  async getSuperHeroes(options: PaginationOptions) {
    return await this.superHeroRepository.find(options)
  }
}
