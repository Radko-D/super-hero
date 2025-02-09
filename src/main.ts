import { NestFactory } from '@nestjs/core'
import { SuperHeroModule } from './SuperHero.module'

async function bootstrap() {
  const app = await NestFactory.create(SuperHeroModule)
  app.enableCors({ origin: 'http://localhost:5173' })
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
