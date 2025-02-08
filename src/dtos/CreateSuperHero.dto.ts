import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator'

export class CreateSuperHeroDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string

  @IsString({ message: 'Power must be a string' })
  @IsNotEmpty({ message: 'Power is required' })
  power: string

  @Min(1)
  @Max(10)
  @IsNumber({}, { message: 'Humility must be a whole number between 1 and 10' })
  @IsNotEmpty({ message: 'Humility is required' })
  humility: number
}
