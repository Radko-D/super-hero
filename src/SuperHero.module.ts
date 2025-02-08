import { Module } from '@nestjs/common'
import { SuperHeroController } from './controllers'
import { SuperHeroService } from './services/SuperHero.service'
import { SuperHero } from './models'
import { SuperHeroRepository } from './repositories'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSource } from './datasource'
import { testDataSource } from './datasource_test'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => (process.env.NODE_ENV === 'test' ? testDataSource.options : dataSource.options),
    }),
    TypeOrmModule.forFeature([SuperHero]),
  ],
  controllers: [SuperHeroController],
  providers: [SuperHeroService, SuperHeroRepository],
})
export class SuperHeroModule {}
