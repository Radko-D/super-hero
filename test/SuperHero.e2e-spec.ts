import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { SuperHeroModule } from '../src/SuperHero.module'
import { DataSource } from 'typeorm'

describe('SuperHero API (e2e)', () => {
  let app: INestApplication
  let dataSource: DataSource

  beforeAll(async () => {
    console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SuperHeroModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    // Important: Add ValidationPipe to match your actual application setup
    app.useGlobalPipes(new ValidationPipe())

    await app.init()

    // Get the DataSource instance
    dataSource = moduleFixture.get<DataSource>(DataSource)
  })

  beforeEach(async () => {
    // Clear the database before each test
    const entities = dataSource.entityMetadatas
    for (const entity of entities) {
      const repository = dataSource.getRepository(entity.name)
      await repository.clear()
    }
  })

  describe('GET /', () => {
    it('should return empty array when no superheroes exist', () => {
      return request(app.getHttpServer()).get('/').expect(200).expect([])
    })

    it('should return paginated superheroes', async () => {
      // First create a superhero
      await request(app.getHttpServer()).post('/').send({
        name: 'Superman',
        power: 'Flying',
        humility: 10,
      })

      // Then test pagination
      return request(app.getHttpServer())
        .get('/?skip=0&take=10')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(1)
          expect(res.body[0]).toHaveProperty('name', 'Superman')
        })
    })
  })

  describe('POST /', () => {
    it('should create a superhero with valid data', () => {
      return request(app.getHttpServer())
        .post('/')
        .send({
          name: 'Superman',
          power: 'Flying',
          humility: 10,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id')
          expect(res.body).toHaveProperty('name', 'Superman')
          expect(res.body).toHaveProperty('power', 'Flying')
          expect(res.body).toHaveProperty('humility', 10)
          expect(res.body).toHaveProperty('createdAt')
        })
    })

    it('should validate humility range', () => {
      return request(app.getHttpServer())
        .post('/')
        .send({
          name: 'Superman',
          power: 'Flying',
          humility: 11, // Over maximum of 10
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message[0]).toContain('humility')
        })
    })
    it('should require all fields', () => {
      return request(app.getHttpServer())
        .post('/')
        .send({
          name: 'Superman',
          // Missing power and humility
        })
        .expect(400)
        .expect((res) => {
          // Check if the response contains the specific error messages
          expect(res.body.message).toEqual(
            expect.arrayContaining([
              'Power is required',
              'Power must be a string',
              'Humility is required',
              'Humility must be a whole number between 1 and 10',
              'humility must not be greater than 10',
              'humility must not be less than 1',
            ]),
          )
        })
    })
  })
})
