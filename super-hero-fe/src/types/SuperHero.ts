export interface SuperHero {
  id: number
  name: string
  power: string
  humility: number
  createdAt: string
}

export interface CreateSuperHeroDto {
  name: string
  power: string
  humility: number
}
