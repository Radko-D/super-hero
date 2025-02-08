import { HttpException, Injectable } from '@nestjs/common'
import { SuperHeroRepository } from '../repositories'
import { PaginationOptions } from '../models'
import { CreateSuperHeroDto } from '../dtos'
import { log } from 'console'

@Injectable()
export class SuperHeroService {
  constructor(private readonly superHeroRepository: SuperHeroRepository) {}

  async createSuperHero(superHero: CreateSuperHeroDto) {
    try {
      return await this.superHeroRepository.createSuperHero(superHero)
    } catch (error) {
      log(error.message) // Replace with your preferred logging mechanism
      throw new HttpException('Failed to create superhero', 500)
    }
  }

  async getSuperHeroes(options: PaginationOptions) {
    return await this.superHeroRepository.getSuperHeroes(options)
  }
}
