import {BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'customers'})
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  @Index({unique: true})
  public email: string

  @Column({nullable: true})
  public stripeCustomerId: string
}
