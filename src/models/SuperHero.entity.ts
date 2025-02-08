import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class SuperHero {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number

  @Column({ name: 'name', type: 'text' })
  name: string

  @Column({ name: 'power', type: 'text' })
  power: string

  @Column({ name: 'humility', type: 'integer' })
  humility: number

  @Column({ name: 'createdAt', type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
