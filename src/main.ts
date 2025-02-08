import { NestFactory } from '@nestjs/core'
import { SuperHeroModule } from './SuperHero.module'

async function bootstrap() {
  const app = await NestFactory.create(SuperHeroModule)
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
