import { CreateSuperHeroDto, SuperHero } from '../types/SuperHero';

const API_URL = 'http://localhost:3000';

export const superHeroApi = {
  getSuperHeroes: async (skip: number = 0, take: number = 10): Promise<SuperHero[]> => {
    const response = await fetch(`${API_URL}?skip=${skip}&take=${take}`);
    if (!response.ok) {
      throw new Error('Failed to fetch superheroes');
    }
    return response.json();
  },

  createSuperHero: async (hero: CreateSuperHeroDto): Promise<SuperHero> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hero),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create superhero');
    }

    return response.json();
  },
};