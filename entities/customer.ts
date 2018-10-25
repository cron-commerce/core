import {BaseEntity, Column, Entity, Index, OneToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

import {Shop} from './shop'
import {Subscription} from './subscription'

@Entity({name: 'customers'})
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  @Index({unique: true})
  public email: string

  @Column({nullable: true})
  public shopifyId: string

  @Column({nullable: true})
  public stripeId: string

  @OneToMany(type => Subscription, subscription => subscription.customer)
  public subscriptions: Subscription[]

  @ManyToOne(type => Shop, shop => shop.customers)
  public shop: Shop
}
