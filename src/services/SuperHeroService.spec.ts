import { Test, TestingModule } from '@nestjs/testing'
import { SuperHeroService } from './SuperHero.service'
import { SuperHeroRepository } from '../repositories'
import { CreateSuperHeroDto } from '../dtos'

describe('SuperHeroService', () => {
  let service: SuperHeroService
  let repository: SuperHeroRepository

  // We create a mock repository to avoid actual database calls
  const mockRepository = {
    createSuperHero: jest.fn(),
    getSuperHeroes: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuperHeroService,
        {
          provide: SuperHeroRepository,
          useValue: mockRepository,
        },
      ],
    }).compile()

    service = module.get<SuperHeroService>(SuperHeroService)
    repository = module.get<SuperHeroRepository>(SuperHeroRepository)
  })

  describe('createSuperHero', () => {
    it('should successfully create a superhero', async () => {
      // Arrange
      const superheroDto: CreateSuperHeroDto = {
        name: 'Superman',
        power: 'Flying',
        humility: 10,
      }
      const expectedSuperhero = {
        id: 1,
        ...superheroDto,
        createdAt: new Date(),
      }
      mockRepository.createSuperHero.mockResolvedValue(expectedSuperhero)

      // Act
      const result = await service.createSuperHero(superheroDto)

      // Assert
      expect(repository.createSuperHero).toHaveBeenCalledWith(superheroDto)
      expect(result).toEqual(expectedSuperhero)
    })
  })

  describe('getSuperHeroes', () => {
    it('should return paginated superheroes', async () => {
      // Arrange
      const paginationOptions = { skip: 0, take: 10 }
      const expectedHeroes = [
        {
          id: 1,
          name: 'Superman',
          power: 'Flying',
          humility: 10,
          createdAt: new Date(),
        },
      ]
      mockRepository.getSuperHeroes.mockResolvedValue(expectedHeroes)

      // Act
      const result = await service.getSuperHeroes(paginationOptions)

      // Assert
      expect(repository.getSuperHeroes).toHaveBeenCalledWith(paginationOptions)
      expect(result).toEqual(expectedHeroes)
    })
  })
})
