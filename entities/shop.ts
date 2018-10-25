import {BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

import {Customer} from './customer'
import {Subscription} from './subscription'

@Entity({name: 'shops'})
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  @Index({unique: true})
  public name: string

  @Column({nullable: true})
  public stripePublishableKey: string

  @Column({nullable: true})
  public stripeUserId: string

  @Column({nullable: true})
  public shopifyAccessToken: string

  @OneToMany(type => Subscription, subscription => subscription.shop)
  public subscriptions: Subscription[]

  @OneToMany(type => Customer, customer => customer.shop)
  public customers: Customer[]
}
