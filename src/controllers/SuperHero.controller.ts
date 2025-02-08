import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { CreateSuperHeroDto } from '../dtos'
import { PaginationOptions } from '../models'
import { SuperHeroService } from '../services'

@Controller()
export class SuperHeroController {
  constructor(private readonly superHeroService: SuperHeroService) {}

  @Get()
  async getSuperHeroes(@Query() query?: PaginationOptions) {
    return await this.superHeroService.getSuperHeroes(query)
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createSuperHero(@Body() superHero: CreateSuperHeroDto) {
    return await this.superHeroService.createSuperHero(superHero)
  }
}
