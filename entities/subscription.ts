import {BaseEntity, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

import {Customer} from './customer'
import {SubscriptionLineItem} from './subscription-line-item'
import {Shop} from './shop'

@Entity({name: 'subscriptions'})
export class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(type => Shop, shop => shop.subscriptions)
  public shop: Shop

  @ManyToOne(type => Customer, customer => customer.subscriptions)
  public customer: Customer

  @OneToMany(type => SubscriptionLineItem, lineItem => lineItem.subscription)
  public lineItems: SubscriptionLineItem[]
}
