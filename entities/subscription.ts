import {BaseEntity, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

import {Customer} from './customer'
import {LineItem} from './line-item'

@Entity({name: 'subscriptions'})
export class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(type => Customer, customer => customer.subscriptions)
  public customer: Customer

  @OneToMany(type => LineItem, lineItem => lineItem.subscription)
  public lineItems: LineItem[]
}
